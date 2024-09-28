from fastapi import APIRouter


api_router = APIRouter()

@api_router.post("/sign-in", tags=["IAM"])
async def sign_in():
    ...


@api_router.post("/sign-up", tags=["IAM"])
async def sign_up():
    ...


@api_router.post("/refresh", tags=["IAM"])
async def refresh():
    ...


@api_router.get("/user-data", tags=["IAM"])
async def get_user_data():
    ...


@api_router.post("/authorize", tags=["Internal"])
async def authorize_user():
    ...
