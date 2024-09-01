from fastapi import APIRouter, Depends, Query, status

from app.dependencies import get_tiktok_integration_usecase
from core.usecases.tiktok_integration import TikTokIntegrationUseCase

api_router = APIRouter(prefix="/integrations")

@api_router.post("/tiktok/start", status_code=status.HTTP_201_CREATED, tags=["TikTok"])
async def tiktok_integration_start(
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase),
	code: str = Query(alias="code", description="TikTok authorization code")):

	tiktok_integration_usecase.get_token(user_id="test", code=code)
