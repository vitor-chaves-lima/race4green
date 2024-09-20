import os
from pydantic import BaseModel, RedisDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class TikTokIntegrationSettings(BaseModel):
	database_connection_string: RedisDsn = os.getenv("DATABASE_CONNECTION_STRING")

	token_uri: str = os.getenv("TIKTOK_TOKEN_URI")
	redirect_uri: str = os.getenv("TIKTOK_REDIRECT_URI")
	client_key: str = os.getenv("TIKTOK_CLIENT_KEY")
	client_secret: str = os.getenv("TIKTOK_CLIENT_SECRET")


class Settings(BaseSettings):
	env: str = os.getenv("ENV", "dev")

	tiktok_integration: TikTokIntegrationSettings = TikTokIntegrationSettings()

	model_config = SettingsConfigDict(env_prefix='integrations_service')
