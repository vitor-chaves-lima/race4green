import secrets

from core.db.repositories.csrf_state import CSRFStateRepository
from core.db.repositories.tiktok_token import TikTokTokenRepository
from core.exceptions import CSRFStateException, TokenException
from core.models.tiktok_integration import TikTokUser, TikTokToken, TikTokTokenType, TikTokIntegrationStatus, \
	TokenResponse
from core.models.user import User
from core.services.tiktok_integration import TikTokIntegrationService
from core.settings import TikTokIntegrationSettings


class TikTokIntegrationUseCase:
	_settings: TikTokIntegrationSettings
	_csrf_state_repository: CSRFStateRepository
	_token_repository: TikTokTokenRepository
	_tiktok_integration_service: TikTokIntegrationService

	def __init__(self,
				 settings: TikTokIntegrationSettings,
				 csrf_state_repository: CSRFStateRepository,
				 token_repository: TikTokTokenRepository,
				 tiktok_integration_service: TikTokIntegrationService):
		self._settings = settings
		self._csrf_state_repository = csrf_state_repository
		self._token_repository = token_repository
		self._tiktok_integration_service = tiktok_integration_service


	_tiktok_integration_service: TikTokIntegrationService

	@staticmethod
	def _generate_csrf_state(length: int) -> str:
		return secrets.token_urlsafe(length)


	def _get_access_token(self, user: User) -> TikTokToken:
		refresh_token = self._token_repository.get_token(user=user, token_type=TikTokTokenType.REFRESH)

		if refresh_token is None:
			raise TokenException(error_type="InvalidRefreshToken", error_description="Invalid refresh token")

		token_response = self._tiktok_integration_service.refresh_token(refresh_token=refresh_token)

		refresh_token = TikTokToken(
			value=token_response.refresh_token,
			expires_in=token_response.refresh_token_expires_in,
			token_type=TikTokTokenType.REFRESH
		)

		return refresh_token


	def get_authorize_url(self, user: User) -> str:
		csrf_state = self._generate_csrf_state(32)

		self._csrf_state_repository.store_state(user, csrf_state)

		authorize_url = (
			f"https://www.tiktok.com/v2/auth/authorize/"
			f"?client_key={self._settings.client_key}"
			f"&scope=user.info.basic"
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


	def sync(self, user: User):
		access_token = self._token_repository.get_token(user=user, token_type=TikTokTokenType.ACCESS)

		if access_token is None:
			new_access_token = self._get_access_token(user)
			self._token_repository.store_token(user, new_access_token)
			access_token = new_access_token


