from fastapi import FastAPI
from fastapi.params import Depends

from app.dependencies import get_users_repository
from app.router import api_router

app = FastAPI(dependencies=[Depends(get_users_repository)])
app.include_router(api_router)
