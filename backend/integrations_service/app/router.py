from fastapi import APIRouter, status

api_router = APIRouter(prefix="/integrations")

@api_router.post("/tiktok/callback",
                 status_code=status.HTTP_200_OK,
                 tags=["TikTok"]
                 )
async def tiktok_integration_callback():
    return {"Hello": "World"}
