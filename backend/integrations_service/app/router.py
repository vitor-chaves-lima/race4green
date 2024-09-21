from fastapi import APIRouter, Depends, status
from fastapi.responses import RedirectResponse

from app.dependencies import get_tiktok_integration_usecase
from core.models.user import User
from core.usecases.tiktok_integration import TikTokIntegrationUseCase

api_router = APIRouter(prefix="/integrations")

@api_router.get("/tiktok/init",
				responses={
					302: {"description": "Redireciona para a página de autenticação do TikTok"},
					400: {"description": "Erro ao gerar a URL de autorização do TikTok"},
				}, tags=["TikTok"])
async def tiktok_integration_init(
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id="test")

	authorize_url = tiktok_integration_usecase.get_authorize_url(user)

	return RedirectResponse(authorize_url.authorize_url, status.HTTP_302_FOUND)


@api_router.post("/tiktok/callback", status_code=status.HTTP_201_CREATED, tags=["TikTok"])
async def tiktok_integration_callback(
	state: str,
	code: str,
	tiktok_integration_usecase: TikTokIntegrationUseCase = Depends(get_tiktok_integration_usecase)):

	user = User(user_id="test")

	tiktok_integration_usecase.get_token(user, state=state, code=code)
