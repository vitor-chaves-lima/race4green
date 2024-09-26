import secrets
import re
from datetime import datetime
from typing import List

from core.db.repositories.csrf_state import CSRFStateRepository
from core.db.repositories.sync import SyncRepository
from core.db.repositories.tiktok_token import TikTokTokenRepository
from core.exceptions import CSRFStateException, TokenException
from core.models.tiktok_integration import TikTokUser, TikTokToken, TikTokTokenType, TikTokIntegrationStatus, \
	TokenResponse, TikTokVideoData
from core.models.user import User
from core.services.tiktok_integration import TikTokIntegrationService
from core.settings import TikTokIntegrationSettings


class TikTokIntegrationUseCase:
	_settings: TikTokIntegrationSettings
	_csrf_state_repository: CSRFStateRepository
	_sync_repository: SyncRepository
	_token_repository: TikTokTokenRepository
	_tiktok_integration_service: TikTokIntegrationService

	FORMULAE_HASHTAG = r"#FormulaE"

	def __init__(self,
				 settings: TikTokIntegrationSettings,
				 csrf_state_repository: CSRFStateRepository,
				 sync_repository: SyncRepository,
				 token_repository: TikTokTokenRepository,
				 tiktok_integration_service: TikTokIntegrationService):
		self._settings = settings
		self._csrf_state_repository = csrf_state_repository
		self._token_repository = token_repository
		self._sync_repository = sync_repository
		self._tiktok_integration_service = tiktok_integration_service


	_tiktok_integration_service: TikTokIntegrationService

	@staticmethod
	def _generate_csrf_state(length: int) -> str:
		return secrets.token_urlsafe(length)


	def _get_new_access_token(self, user: User) -> TikTokToken:
		refresh_token = self._token_repository.get_token(user=user, token_type=TikTokTokenType.REFRESH)

		if refresh_token is None:
			raise TokenException(error_type="InvalidRefreshToken", error_description="Invalid refresh token")

		token_response = self._tiktok_integration_service.refresh_token(refresh_token=refresh_token)

		access_token = TikTokToken(
			value=token_response.access_token,
			expires_in=token_response.access_token_expires_in,
			token_type=TikTokTokenType.ACCESS
		)

		return access_token


	def _get_access_token(self, user: User) -> TikTokToken:
		access_token = self._token_repository.get_token(user=user, token_type=TikTokTokenType.ACCESS)

		if access_token is None:
			new_access_token = self._get_new_access_token(user)
			self._token_repository.store_token(user, new_access_token)
			access_token = new_access_token

		return access_token


	def _fetch_whole_movies_list(self, user: User, last_sync_timestamp: int) -> List[TikTokVideoData]:
		videos_list: List[TikTokVideoData] = list[TikTokVideoData]()

		access_token = self._get_access_token(user)
		videos_list_response = self._tiktok_integration_service.get_videos_list(access_token, last_sync_timestamp)
		videos_list.extend(videos_list_response.videos)

		while videos_list_response.has_more is True:
			cursor = videos_list_response.cursor
			access_token = self._get_access_token(user)
			videos_list_response = self._tiktok_integration_service.get_videos_list(access_token, cursor)
			videos_list.extend(videos_list_response.videos)

		return videos_list

	def get_authorize_url(self, user: User) -> str:
		csrf_state = self._generate_csrf_state(32)

		self._csrf_state_repository.store_state(user, csrf_state)

		authorize_url = (
			f"https://www.tiktok.com/v2/auth/authorize/"
			f"?client_key={self._settings.client_key}"
			f"&scope=user.info.basic,video.list"
			f"&response_type=code"
			f"&redirect_uri={self._settings.redirect_uri}"
			f"&state={csrf_state}"
		)

		return authorize_url


	def get_token(self, user: User, state: str, code: str):
		csrf_state = self._csrf_state_repository.get_state(user)

		if state != csrf_state:
			raise CSRFStateException()

		tiktok_token_response = self._tiktok_integration_service.get_token(code)
		access_token = TikTokToken(
					value=tiktok_token_response.access_token,
					expires_in=tiktok_token_response.access_token_expires_in,
					token_type=TikTokTokenType.ACCESS
					)

		refresh_token = TikTokToken(
					value=tiktok_token_response.refresh_token,
					expires_in=tiktok_token_response.refresh_token_expires_in,
					token_type=TikTokTokenType.REFRESH
					)

		tiktok_user = TikTokUser(
			user_id=tiktok_token_response.user_id,
		)

		self._token_repository.store_token(user, access_token)
		self._token_repository.store_token(user, refresh_token)
		self._token_repository.store_user(user, tiktok_user)
		self._csrf_state_repository.delete_state(user)


	def get_integration_status(self, user: User) -> TikTokIntegrationStatus:
		refresh_token = self._token_repository.get_token(user=user, token_type=TikTokTokenType.REFRESH)
		tiktok_user = self._token_repository.get_user(user)

		if refresh_token is None or tiktok_user is None:
			return TikTokIntegrationStatus.NOT_CONNECTED
		else:
			return TikTokIntegrationStatus.CONNECTED


	def delete_user(self, user: User):
		self._token_repository.clear_user_data(user)
		self._sync_repository.clear_user_data(user)


	def sync(self, user: User):
		last_sync_timestamp = self._sync_repository.get_last_sync_timestamp(user)
		new_sync_timestamp = int(datetime.now().timestamp())
		videos_list = self._fetch_whole_movies_list(user, last_sync_timestamp)

		videos_with_hashtag = []
		for video in videos_list:
			if re.search(self.FORMULAE_HASHTAG, video.title):
				videos_with_hashtag.append(video)

		if len(videos_with_hashtag) > 0:
			self._sync_repository.update_sync_state(user, new_sync_timestamp, videos_with_hashtag)


	def list_videos(self, user: User) -> List[TikTokVideoData]:
		return self._sync_repository.get_last_sync_videos(user)
