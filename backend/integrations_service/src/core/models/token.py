from enum import Enum
from pydantic import BaseModel, Field


class TokenType(Enum):
    ACCESS = "accessToken"
    REFRESH = "refreshToken"


class Token(BaseModel):
    user_id: str = Field(description="User id")
    value: str = Field(description="Token value")
    expires_in: int = Field(description="Time to live in seconds")
    token_type: TokenType = Field(description="Type of the token")
