from fastapi import Request, status
from fastapi.responses import JSONResponse

from core.exceptions import TokenException, CSRFStateException


async def csrf_exception_handler(_: Request, exc: CSRFStateException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "A validação de CSRF não foi concluída com sucesso",
			"error": {
				"type": "invalid_csrf_state",
				"description": exc.error_description
			}
        },
    )


async def token_exception_handler(_: Request, exc: TokenException):
    if exc.error_type == "InvalidRefreshToken":
        return JSONResponse(
			status_code=status.HTTP_400_BAD_REQUEST,
			content={
				"message": "Não foi verificar a integração com o Tik Tok",
				"error": {
					"type": exc.error_type,
					"description": exc.error_description
				},
			},
		)
    else:
        return JSONResponse(
			status_code=status.HTTP_400_BAD_REQUEST,
			content={
				"message": "Não foi possível validar o código de autorização do Tik Tok",
				"error": {
					"type": exc.error_type,
					"description": exc.error_description
				},
			},
		)


def get_exception_handlers():
    return [
		(CSRFStateException, csrf_exception_handler),
        (TokenException, token_exception_handler),
    ]
