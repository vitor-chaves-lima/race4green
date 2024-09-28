import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	env: str = os.getenv("ENV", "dev")

	postgres_url: str = os.getenv("POSTGRES_URL")

	model_config = SettingsConfigDict(env_prefix='iam_service')
