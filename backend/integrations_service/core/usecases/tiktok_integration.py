from core.db.repositories.tiktok_token import TikTokTokenRepository
from core.models.tiktok_integration import TikTokUser, TikTokToken, TikTokTokenType
from core.models.user import User
from core.services.tiktok_integration import TikTokIntegrationService


class TikTokIntegrationUseCase:
	_token_repository: TikTokTokenRepository
	_tiktok_integration_service: TikTokIntegrationService


	def __init__(self, token_repository: TikTokTokenRepository, tiktok_integration_service: TikTokIntegrationService):
		self._token_repository = token_repository
		self._tiktok_integration_service = tiktok_integration_service


	def get_token(self, user: User, code: str):
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
