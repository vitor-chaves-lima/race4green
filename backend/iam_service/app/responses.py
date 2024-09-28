from pydantic import BaseModel, Field


class SignInResponse(BaseModel):
    accessToken: str = Field(alias="access_token")
    refreshToken: str = Field(alias="refresh_token")
    accessTokenExpiresAt: int = Field(alias="access_token_expires_at")


class RefreshResponse(BaseModel):
    accessToken: str = Field(alias="access_token")
    accessTokenExpiresAt: int = Field(alias="access_token_expires_at")
