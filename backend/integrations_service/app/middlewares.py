import requests
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.dependencies import get_env, get_iam_service_url

security = HTTPBearer()

async def authorize(auth_credentials: HTTPAuthorizationCredentials = Depends(security),
                    env: str = Depends(get_env),
                    iam_service_url: str = Depends(get_iam_service_url)):
    if env != "dev":
        response = requests.post(f"{iam_service_url}/authorize", json={
			"accessToken": auth_credentials.credentials
		})

        response_json = response.json()
        return response_json["userId"]
    else:
        return "test"
