from core.settings import Settings
from core.db.redis_connector import RedisConnector
from core.db.repositories.token import TokenRepository


settings = Settings()
redis_connector = RedisConnector(redis_url=settings.tiktok_integration.database_connection_string)
token_repository= TokenRepository(redis_connector)

def get_token_repository() -> TokenRepository:
    return token_repository
