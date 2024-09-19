from core.db.repositories.token import TokenRepository
from core.services.tiktok_integration import TikTokIntegrationService
from core.models.token import Token, TokenType


class TikTokIntegrationUseCase:
	_token_repository: TokenRepository
	_tiktok_integration_service: TikTokIntegrationService


	def __init__(self, token_repository: TokenRepository, tiktok_integration_service: TikTokIntegrationService):
		self._token_repository = token_repository
		self._tiktok_integration_service = tiktok_integration_service


	def get_token(self, user_id: str, code: str):
		tiktok_token_response = self._tiktok_integration_service.get_token(code)
		access_token = Token(
					user_id=user_id,
					value=tiktok_token_response.access_token,
					expires_in=tiktok_token_response.access_token_expires_in,
					token_type=TokenType.ACCESS
					)

		refresh_token = Token(
					user_id=user_id,
					value=tiktok_token_response.refresh_token,
					expires_in=tiktok_token_response.refresh_token_expires_in,
					token_type=TokenType.REFRESH
					)

		self._token_repository.store(access_token)
		self._token_repository.store(refresh_token)
