from pydantic import BaseModel, Field


class User(BaseModel):
    user_id: str = Field(description="Race4Green User id")
