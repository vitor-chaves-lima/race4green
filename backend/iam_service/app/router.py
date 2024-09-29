from fastapi import APIRouter, status
from fastapi.params import Depends

from app.dependencies import get_auth_usecase
from app.middlewares import authorize
from app.requests import SignUpRequestPayload, SignInRequestPayload, RefreshRequestPayload, AuthorizeRequest
from app.responses import RefreshResponse, ErrorResponse, SignInResponse, UserDataResponse, AuthorizeResponse
from core.usecases.auth import AuthUseCase

api_router = APIRouter(prefix="/iam")

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


@api_router.get("/user-data", tags=["IAM"],status_code=status.HTTP_200_OK,
				 response_model=UserDataResponse)
async def get_user_data(user_id: str = Depends(authorize), auth_usecase: AuthUseCase = Depends(get_auth_usecase)):
	gender, hair, shirt, pants = auth_usecase.get_user_data(user_id)
	return UserDataResponse(character_gender=gender,
							character_hair_index=hair,
							character_shirt_index=shirt,
							character_pants_index=pants)


@api_router.post("/authorize", tags=["Internal"], response_model=AuthorizeResponse)
async def authorize_user(request: AuthorizeRequest, auth_usecase: AuthUseCase = Depends(get_auth_usecase)):
	user_id = auth_usecase.validate_access_token(access_token=request.access_token)
	return AuthorizeResponse(user_id=user_id)
