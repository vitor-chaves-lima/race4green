from core.settings import Settings
from core.db.redis_connector import RedisConnector
from core.db.repositories.tiktok_token import TikTokTokenRepository
from core.services.tiktok_integration import TikTokIntegrationService
from core.usecases.tiktok_integration import TikTokIntegrationUseCase


settings = Settings()
redis_connector = RedisConnector(redis_url=settings.tiktok_integration.database_connection_string)
tiktok_token_repository= TikTokTokenRepository(redis_connector)
tiktok_integration_service = TikTokIntegrationService(settings.tiktok_integration)
tiktok_integration_usecase = TikTokIntegrationUseCase(tiktok_token_repository, tiktok_integration_service)


def get_tiktok_integration_usecase() -> TikTokIntegrationUseCase:
	return tiktok_integration_usecase
