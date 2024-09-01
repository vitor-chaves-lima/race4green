from fastapi import FastAPI

from app.router import api_router
from core.settings import Settings


settings = Settings()

app = FastAPI()
app.include_router(api_router)
