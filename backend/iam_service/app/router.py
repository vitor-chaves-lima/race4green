from fastapi import APIRouter, status
from fastapi.params import Depends

from app.dependencies import get_auth_usecase
from app.requests import SignUpRequestPayload, SignInRequestPayload, RefreshRequestPayload
from app.responses import RefreshResponse, ErrorResponse, SignInResponse
from core.usecases.auth import AuthUseCase

api_router = APIRouter()


@api_router.post("/sign-up", tags=["IAM"], status_code=status.HTTP_201_CREATED,
				 responses={400: {"model": ErrorResponse}})
async def sign_up(request: SignUpRequestPayload, auth_usecase: AuthUseCase = Depends(get_auth_usecase)):
	email = request.email
	password = request.password
	password_confirm = request.password_confirm
	character_gender = request.character_gender
	character_hair_index = request.character_hair_index
	character_shirt_index = request.character_shirt_index
	character_pants_index = request.character_pants_index

	auth_usecase.sign_up(email, password, password_confirm,
						 character_gender, character_hair_index, character_shirt_index, character_pants_index)


@api_router.post("/sign-in", tags=["IAM"], status_code=status.HTTP_200_OK,
				 responses={400: {"model": ErrorResponse}}, response_model=SignInResponse)
async def sign_in(request: SignInRequestPayload, auth_usecase: AuthUseCase = Depends(get_auth_usecase)) -> SignInResponse:
	email = request.email
	password = request.password

	refresh_token, access_token, access_token_expires_at = auth_usecase.sign_in(email, password)
	return SignInResponse(refresh_token=refresh_token,
						  access_token=access_token,
						  access_token_expires_at=access_token_expires_at)


@api_router.post("/refresh", tags=["IAM"],status_code=status.HTTP_200_OK,
				 response_model=RefreshResponse)
async def refresh(request: RefreshRequestPayload, auth_usecase: AuthUseCase = Depends(get_auth_usecase)):
	refresh_token = request.refresh_token

	access_token, access_token_expires_at = auth_usecase.refresh_token(refresh_token)
	return RefreshResponse(access_token=access_token,
						  access_token_expires_at=access_token_expires_at)


@api_router.get("/user-data", tags=["IAM"])
async def get_user_data():
	...


@api_router.post("/authorize", tags=["Internal"])
async def authorize_user():
	...
