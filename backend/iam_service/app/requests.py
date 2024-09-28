from typing import Annotated, Literal
from pydantic import BaseModel, EmailStr, Field, StringConstraints


class SignUpRequestPayload(BaseModel):
    email: EmailStr
    password: Annotated[str,StringConstraints(min_length=8)]
    password_confirm: Annotated[str,StringConstraints(min_length=8)] = Field(alias="passwordConfirm")
    character_gender: Literal['male', 'female'] = Field(alias="characterGender")
    character_hair_index: Literal[0, 1, 2] = Field(alias="characterHairIndex")
    character_shirt_index: Literal[0, 1, 2] = Field(alias="characterShirtIndex")
    character_pants_index: Literal[0, 1, 2] = Field(alias="characterPantsIndex")


class SignInRequestPayload(BaseModel):
    email: EmailStr
    password: Annotated[str,StringConstraints(min_length=8)]


class RefreshRequestPayload(BaseModel):
    refresh_token: str = Field(alias="refreshToken")
