from core.settings import Settings
from core.db.redis_connector import RedisConnector
from core.db.repositories.token import TokenRepository
from core.services.tiktok_integration import TikTokIntegrationService


settings = Settings()
redis_connector = RedisConnector(redis_url=settings.tiktok_integration.database_connection_string)
token_repository= TokenRepository(redis_connector)
tiktok_integration_service = TikTokIntegrationService(settings.tiktok_integration)

# def get_token_repository() -> TokenRepository:
#     return token_repository

def get_tiktok_integration_service() -> TikTokIntegrationService:
	return tiktok_integration_service
