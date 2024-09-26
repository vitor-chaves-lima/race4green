from typing import List

from pydantic import BaseModel, Field

from core.models.tiktok_integration import TikTokIntegrationStatus, TikTokVideoData


class TikTokIntegrationInitResponseModel(BaseModel):
    authorize_url: str = Field(alias='authorizeUrl')


class TikTokIntegrationStatusResponseModel(BaseModel):
    status: TikTokIntegrationStatus


class TikTokIntegrationVideosListResponseModel(BaseModel):
    videos: List[TikTokVideoData]
