from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.dependencies import get_auth_usecase

security = HTTPBearer()

async def authorize(auth_credentials: HTTPAuthorizationCredentials = Depends(security), auth_usecase = Depends(get_auth_usecase)):
    return auth_usecase.validate_access_token(auth_credentials.credentials)
