from fastapi import Depends, FastAPI
from app.router import api_router
from app.dependencies import get_tiktok_integration_service


app = FastAPI(dependencies=[Depends(get_tiktok_integration_service)])
app.include_router(api_router)
