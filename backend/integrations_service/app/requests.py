from pydantic import BaseModel


class TokenRequest(BaseModel):
    code: str
