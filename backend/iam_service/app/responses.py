from pydantic import BaseModel, Field


class ErrorDescriptor(BaseModel):
    type: str
    description: str


class ErrorResponse(BaseModel):
    message: str
    error: ErrorDescriptor


class SignInResponse(BaseModel):
    access_token: str = Field(serialization_alias="accessToken")
    refresh_token: str = Field(serialization_alias="refreshToken")
    access_token_expires_at: int = Field(serialization_alias="accessTokenExpiresAt")


class RefreshResponse(BaseModel):
    access_token: str = Field(serialization_alias="accessToken")
    access_token_expires_at: int = Field(serialization_alias="accessTokenExpiresAt")
