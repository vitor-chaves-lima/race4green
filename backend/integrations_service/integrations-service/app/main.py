from fastapi import Depends, FastAPI
from app.router import api_router
from app.dependencies import get_tiktok_integration_usecase
from app.exception_handlers import get_exception_handlers

app = FastAPI(dependencies=[Depends(get_tiktok_integration_usecase)], exception_handlers=get_exception_handlers())
app.include_router(api_router)
