from typing import Annotated
from fastapi import APIRouter, Depends, Query, status

from app.dependencies import get_tiktok_integration_service
from core.services.tiktok_integration import TikTokIntegrationService
from core.models.token import Token, TokenType
from core.db.repositories.token import TokenRepository

api_router = APIRouter(prefix="/integrations")

@api_router.post("/tiktok/callback",
                 status_code=status.HTTP_200_OK,
                 tags=["TikTok"]
                 )
async def tiktok_integration_callback(
	tiktok_integration_service: TikTokIntegrationService = Depends(get_tiktok_integration_service),
	code: str = Query(alias="code", description="TikTok authorization code")):

	test = tiktok_integration_service.get_token()
	_ = test

	# test_token = Token(user_id="test", value="AAA", expires_in=3600, token_type=TokenType.ACCESS)
	# token_repository.store(test_token)

	# test = token_repository.get_token("test", TokenType.ACCESS)
	# _ = test
	...
