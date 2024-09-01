from fastapi import Depends, FastAPI

from app.router import api_router
from app.dependencies import get_token_repository


app = FastAPI(dependencies=[Depends(get_token_repository)])
app.include_router(api_router)
