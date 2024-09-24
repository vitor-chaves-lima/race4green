from enum import Enum
from typing import Dict, Optional, List
from pydantic import BaseModel, Field


class TokenRequest(BaseModel):
    client_key: str = Field(description="The unique identification key provisioned to the partner.")
    client_secret: str = Field(description="The unique identification secret provisioned to the partner.")
    code: str = Field(description="The authorization code from the web, iOS, Android or desktop authorization callback. The value should be URL decoded.")
    grant_type: str = Field("authorization_code", description="Its value should always be set as authorization_code.")
    redirect_uri: str = Field(description="Its value must be the same as the redirect_uri used for requesting code.")


class RefreshTokenRequest(BaseModel):
    client_key: str = Field(description="The unique identification key provisioned to the partner.")
    client_secret: str = Field(description="The unique identification secret provisioned to the partner.")
    refresh_token: str = Field(description="The refresh token.")
    grant_type: str = Field("refresh_token", description="Its value should always be set as refresh_token.")


class VideosListRequest(BaseModel):
    cursor: Optional[int] = Field(description="The cursor used to retrieve videos.")
    max_count: int = Field(description="The maximum number of videos to return.")


class TokenResponse(BaseModel):
    user_id: str = Field(alias="open_id", description="The unique identifier for the TikTok user, known as 'open_id'.")
    access_token: str = Field(description="The access token that grants authorization to access TikTok resources.")
    access_token_expires_in: int = Field(alias="expires_in", description="The duration (in seconds) for which the access token is valid, specified as 'expires_in'.")
    refresh_token: str = Field(description="The token used to obtain a new access token after the current one expires.")
    refresh_token_expires_in: int = Field(alias="refresh_expires_in", description="The duration (in seconds) for which the refresh token is valid, specified as 'refresh_expires_in'.")

    @staticmethod
    def from_dict(data: Dict) -> "TokenResponse":
        return TokenResponse(**data)


class TikTokVideoData(BaseModel):
    cover_image_url: str = Field(description="URL of the video's cover image")
    id: str = Field(description="Unique ID of the video")
    title: str = Field(description="Title of the video")
    description: str = Field(description="Description of the video")
    create_timestamp: int = Field(description="Timestamp of the video")


class TikTokVideosListResponse(BaseModel):
    videos: List[TikTokVideoData] = Field(description="List of video data")
    cursor: int = Field(description="Cursor for the next page of results")
    has_more: bool = Field(description="Indicates whether more videos are available")


class TikTokTokenType(Enum):
    ACCESS = "accessToken"
    REFRESH = "refreshToken"


class TikTokToken(BaseModel):
    value: str = Field(description="Token value")
    expires_in: int = Field(description="Time to live in seconds")
    token_type: TikTokTokenType = Field(description="Type of the token")


class TikTokUser(BaseModel):
    user_id: str = Field(description="TikTok user id")


class TikTokIntegrationStatus(Enum):
    CONNECTED = "connected"
    NOT_CONNECTED = "notConnected"
