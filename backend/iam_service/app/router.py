from fastapi import APIRouter, status

from app.requests import SignUpRequestPayload, SignInRequestPayload, RefreshRequestPayload
from app.responses import SignInResponse, RefreshResponse

api_router = APIRouter()

@api_router.post("/sign-in", tags=["IAM"], status_code=status.HTTP_201_CREATED)
async def sign_in(request: SignInRequestPayload):
    ...


@api_router.post("/sign-up", tags=["IAM"], status_code=status.HTTP_200_OK,
				 response_model=SignInResponse)
async def sign_up(request: SignUpRequestPayload):
    ...


@api_router.post("/refresh", tags=["IAM"],status_code=status.HTTP_200_OK,
				 response_model=RefreshResponse)
async def refresh(request: RefreshRequestPayload):
    ...


@api_router.get("/user-data", tags=["IAM"])
async def get_user_data():
    ...


@api_router.post("/authorize", tags=["Internal"])
async def authorize_user():
    ...
