from enum import Enum
from typing import Dict
from pydantic import BaseModel, Field


class TokenRequest(BaseModel):
    client_key: str = Field(description="The unique identification key provisioned to the partner.")
    client_secret: str = Field(description="The unique identification secret provisioned to the partner.")
    code: str = Field(description="The authorization code from the web, iOS, Android or desktop authorization callback. The value should be URL decoded.")
    grant_type: str = Field("authorization_code", description="Its value should always be set as authorization_code.")
    redirect_uri: str = Field(description="Its value must be the same as the redirect_uri used for requesting code.")


class TokenResponse(BaseModel):
    user_id: str = Field(alias="open_id", description="The unique identifier for the TikTok user, known as 'open_id'.")
    access_token: str = Field(description="The access token that grants authorization to access TikTok resources.")
    access_token_expires_in: int = Field(alias="expires_in", description="The duration (in seconds) for which the access token is valid, specified as 'expires_in'.")
    refresh_token: str = Field(description="The token used to obtain a new access token after the current one expires.")
    refresh_token_expires_in: int = Field(alias="refresh_expires_in", description="The duration (in seconds) for which the refresh token is valid, specified as 'refresh_expires_in'.")

    @staticmethod
    def from_dict(data: Dict) -> "TokenResponse":
        return TokenResponse(**data)


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
