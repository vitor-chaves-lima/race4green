from fastapi import APIRouter, Depends, status

from app.dependencies import get_tiktok_integration_usecase
from app.middlewares import authorize
from app.responses import TikTokIntegrationInitResponseModel, TikTokIntegrationStatusResponseModel, \
	TikTokIntegrationVideosListResponseModel
from core.models.user import User
from core.usecases.tiktok_integration import TikTokIntegrationUseCase

api_router = APIRouter()

@api_router.get("/tiktok/init",
				responses={
					200: {"description": "Retorna a URL de autenticação do TikTok"},
					400: {"description": "Erro ao gerar a URL de autenticação do TikTok"},
				}, tags=["TikTok"], response_model=TikTokIntegrationInitResponseModel)
async def tiktok_integration_init(
	user_id: str = Depends(authorize),
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)) -> TikTokIntegrationInitResponseModel:

	user = User(user_id=user_id)

	authorize_url = tiktok_integration_usecase.get_authorize_url(user)

	return TikTokIntegrationInitResponseModel(authorizeUrl=authorize_url)


@api_router.post("/tiktok/callback", status_code=status.HTTP_201_CREATED, tags=["TikTok"])
async def tiktok_integration_callback(
	state: str,
	code: str,
	user_id: str = Depends(authorize),
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id=user_id)

	tiktok_integration_usecase.get_token(user, state=state, code=code)


@api_router.get("/tiktok", status_code=status.HTTP_200_OK,
				 tags=["TikTok"], response_model=TikTokIntegrationStatusResponseModel)
async def tiktok_integration_status(
	user_id: str = Depends(authorize),
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id=user_id)

	integration_status = tiktok_integration_usecase.get_integration_status(user)
	return TikTokIntegrationStatusResponseModel(status=integration_status)


@api_router.delete("/tiktok", status_code=status.HTTP_204_NO_CONTENT, tags=["TikTok"])
async def tiktok_integration_delete(
	user_id: str = Depends(authorize),
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id=user_id)

	tiktok_integration_usecase.delete_user(user)


@api_router.post("/tiktok/sync", status_code=status.HTTP_204_NO_CONTENT, tags=["TikTok"])
async def tiktok_integration_sync(
	user_id: str = Depends(authorize),
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)
):
	user = User(user_id=user_id)

	tiktok_integration_usecase.sync(user)


@api_router.get("/tiktok/videos",
				status_code=status.HTTP_200_OK,
				response_model=TikTokIntegrationVideosListResponseModel,
				tags=["TikTok"])
async def tiktok_list_videos(
	user_id: str = Depends(authorize),
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)
):
	user = User(user_id=user_id)

	return TikTokIntegrationVideosListResponseModel(videos=tiktok_integration_usecase.list_videos(user))
