from fastapi import FastAPI
from app.router import api_router


app = FastAPI()
app.include_router(api_router)
