import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	env: str = os.getenv("ENV", "dev")

	postgres_url: str = os.getenv("POSTGRES_URL")
	refresh_token_secret: str = os.getenv("REFRESH_TOKEN_SECRET")
	access_token_secret: str = os.getenv("ACCESS_TOKEN_SECRET")

	model_config = SettingsConfigDict(env_prefix='iam_service')
