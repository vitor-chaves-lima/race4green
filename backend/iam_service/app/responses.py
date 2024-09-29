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


class UserDataResponse(BaseModel):
    character_gender: str = Field(serialization_alias="characterGender")
    character_hair_index: int = Field(serialization_alias="characterHairIndex")
    character_shirt_index: int = Field(serialization_alias="characterShirtIndex")
    character_pants_index: int = Field(serialization_alias="characterPantsIndex")
