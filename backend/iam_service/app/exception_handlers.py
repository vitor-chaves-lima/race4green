from fastapi import Request, status
from fastapi.responses import JSONResponse

from core.exceptions import EmailExistsException, EmailNotFoundException, ExpiredAccessTokenException, ExpiredRefreshTokenException, InvalidAccessTokenException, InvalidCredentialsException, InvalidRefreshTokenException, InvalidPasswordConfirmException


async def email_exists_exception_handler(_: Request, exc: EmailExistsException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"E-mail já cadastrado: {exc.email}",
            "error": {
				"type": EmailExistsException.__name__,
				"description": "Email already exists",
			}
        },
    )


async def invalid_password_confirm_exception_handler(_: Request, exc: InvalidPasswordConfirmException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Confirmação de senha inválida",
            "error": {
				"type": InvalidPasswordConfirmException.__name__,
				"description": "Invalid password confirm",
			}
        },
    )


async def email_not_found_exception_handler(_: Request, exc: EmailNotFoundException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Email {exc.email} not found. Please check the email address and try again.",
            "error": {
				"type": EmailNotFoundException.__name__,
				"description": "Email not found",
			}
        },
    )


async def invalid_credentials_exception_handler(_: Request, exc: InvalidCredentialsException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Credenciais inválidas",
            "error": {
				"type": InvalidCredentialsException.__name__,
				"description": "Invalid credentials",
			}
        },
    )


async def expired_refresh_token_exception_handler(_: Request, exc: ExpiredRefreshTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Refresh token expirado",
            "error": {
				"type": ExpiredRefreshTokenException.__name__,
				"description": "Expired refresh token",
			}
        },
    )


async def invalid_refresh_token_exception_handler(_: Request, exc: InvalidRefreshTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Refresh token inválido",
            "error": {
				"type": InvalidRefreshTokenException.__name__,
				"description": "Invalid refresh token",
			}
        },
    )


async def expired_access_token_exception_handler(_: Request, exc: ExpiredAccessTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Access token expirado",
            "error": {
				"type": ExpiredAccessTokenException.__name__,
				"description": "Expired access token",
			}
        },
    )


async def invalid_access_token_exception_handler(_: Request, exc: InvalidAccessTokenException):
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={
            "message": "Access token inválido",
            "error": {
				"type": InvalidAccessTokenException.__name__,
				"description": "Invalid access token",
			}
        },
    )


def get_exception_handlers():
    return [
        (EmailExistsException, email_exists_exception_handler),
        (InvalidPasswordConfirmException, invalid_password_confirm_exception_handler),
        (EmailNotFoundException, email_not_found_exception_handler),
        (InvalidCredentialsException, invalid_credentials_exception_handler),
        (ExpiredRefreshTokenException, expired_refresh_token_exception_handler),
        (InvalidRefreshTokenException, invalid_refresh_token_exception_handler),
        (ExpiredAccessTokenException, expired_access_token_exception_handler),
        (InvalidAccessTokenException, invalid_access_token_exception_handler),
    ]
