from fastapi import APIRouter, Depends, status

from app.dependencies import get_tiktok_integration_usecase
from app.responses import TikTokIntegrationInitResponseModel, TikTokIntegrationStatusResponseModel
from core.models.user import User
from core.usecases.tiktok_integration import TikTokIntegrationUseCase

api_router = APIRouter()

@api_router.get("/tiktok/init",
				responses={
					200: {"description": "Retorna a URL de autenticação do TikTok"},
					400: {"description": "Erro ao gerar a URL de autenticação do TikTok"},
				}, tags=["TikTok"], response_model=TikTokIntegrationInitResponseModel)
async def tiktok_integration_init(
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)) -> TikTokIntegrationInitResponseModel:

	user = User(user_id="test")

	authorize_url = tiktok_integration_usecase.get_authorize_url(user)

	return TikTokIntegrationInitResponseModel(authorizeUrl=authorize_url)


@api_router.post("/tiktok/callback", status_code=status.HTTP_201_CREATED, tags=["TikTok"])
async def tiktok_integration_callback(
	state: str,
	code: str,
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id="test")

	tiktok_integration_usecase.get_token(user, state=state, code=code)


@api_router.post("/tiktok/status", status_code=status.HTTP_200_OK,
				 tags=["TikTok"], response_model=TikTokIntegrationStatusResponseModel)
async def tiktok_integration_status(
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id="test")

	integration_status = tiktok_integration_usecase.get_integration_status(user)
	return TikTokIntegrationStatusResponseModel(status=integration_status)
