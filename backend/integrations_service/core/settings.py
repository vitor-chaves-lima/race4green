import os
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class TikTokIntegrationSettings(BaseModel):
	database_connection_string: str = os.getenv("DATABASE_CONNECTION_STRING")


class Settings(BaseSettings):
	env: str = os.getenv("ENV", "dev")

	tiktok_integration: TikTokIntegrationSettings = TikTokIntegrationSettings()

	model_config = SettingsConfigDict(env_prefix='integrations_service')
