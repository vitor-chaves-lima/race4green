from core.db.mongo_connector import MongoConnector
from core.db.repositories.csrf_state import CSRFStateRepository
from core.settings import Settings
from core.db.redis_connector import RedisConnector
from core.db.repositories.tiktok_token import TikTokTokenRepository
from core.services.tiktok_integration import TikTokIntegrationService
from core.usecases.tiktok_integration import TikTokIntegrationUseCase


settings = Settings()
redis_connector = RedisConnector(redis_url=settings.tiktok_integration.token_database_connection_string)
mongo_connector = MongoConnector(mongo_url=settings.tiktok_integration.sync_database_connection_string)
csrf_state_repostitory= CSRFStateRepository(redis_connector)
tiktok_token_repository= TikTokTokenRepository(redis_connector)
tiktok_integration_service = TikTokIntegrationService(settings.tiktok_integration)
tiktok_integration_usecase = TikTokIntegrationUseCase(
	settings.tiktok_integration,
	csrf_state_repostitory,
	tiktok_token_repository,
	tiktok_integration_service)


def get_tiktok_integration_usecase() -> TikTokIntegrationUseCase:
	return tiktok_integration_usecase
