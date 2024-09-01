from fastapi import APIRouter, Depends, status

from app.dependencies import get_token_repository
from core.models.token import Token, TokenType
from core.db.repositories.token import TokenRepository

api_router = APIRouter(prefix="/integrations")

@api_router.post("/tiktok/callback",
                 status_code=status.HTTP_200_OK,
                 tags=["TikTok"]
                 )
async def tiktok_integration_callback(token_repository: TokenRepository = Depends(get_token_repository)):

	# test_token = Token(user_id="test", value="AAA", expires_in=3600, token_type=TokenType.ACCESS)
	# token_repository.store(test_token)

	# test = token_repository.get_token("test", TokenType.ACCESS)
	# _ = test

	...
