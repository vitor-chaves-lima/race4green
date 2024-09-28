from fastapi import FastAPI
from fastapi.params import Depends

from app.dependencies import get_auth_usecase
from app.exception_handlers import get_exception_handlers
from app.router import api_router

app = FastAPI(dependencies=[Depends(get_auth_usecase)], exception_handlers=get_exception_handlers())
app.include_router(api_router)
