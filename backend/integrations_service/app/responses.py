from pydantic import BaseModel, Field


class TikTokIntegrationInitResponseModel(BaseModel):
    authorize_url: str = Field(alias='authorizeUrl')
