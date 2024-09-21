from fastapi import Request, status
from fastapi.responses import JSONResponse

from core.exceptions import TokenException


async def token_exception_handler(_: Request, exc: TokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Não foi possível validar o código de autorização do Tik Tok",
            "error": {
                "type": exc.error_type,
                "description": exc.error_description
			},
        },
    )


def get_exception_handlers():
    return [
        (TokenException, token_exception_handler),
    ]
