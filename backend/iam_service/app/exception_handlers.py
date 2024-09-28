from fastapi import Request, status
from fastapi.responses import JSONResponse

from core.exceptions import EmailExistsException, EmailNotFoundException, ExpiredAccessTokenException, ExpiredRefreshTokenException, InvalidAccessTokenException, InvalidCredentialsException, InvalidRefreshTokenException, InvalidPasswordConfirmException


async def email_exists_exception_handler(_: Request, exc: EmailExistsException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Email already registered: {exc.email}",
            "error": EmailExistsException.__name__
        },
    )


async def invalid_password_confirm_exception_handler(_: Request, exc: InvalidPasswordConfirmException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Invalid password confirm",
            "error": InvalidPasswordConfirmException.__name__
        },
    )


async def email_not_found_exception_handler(_: Request, exc: EmailNotFoundException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Email {exc.email} not found. Please check the email address and try again.",
            "error": EmailNotFoundException.__name__
        },
    )


async def invalid_credentials_exception_handler(_: Request, exc: InvalidCredentialsException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Invalid credentials",
            "error": InvalidCredentialsException.__name__
        },
    )


async def expired_refresh_token_exception_handler(_: Request, exc: ExpiredRefreshTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Expired refresh token",
            "error": ExpiredRefreshTokenException.__name__
        },
    )


async def invalid_refresh_token_exception_handler(_: Request, exc: InvalidRefreshTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Invalid refresh token",
            "error": InvalidRefreshTokenException.__name__
        },
    )


async def expired_access_token_exception_handler(_: Request, exc: ExpiredAccessTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Expired access token",
            "error": ExpiredAccessTokenException.__name__
        },
    )


async def invalid_access_token_exception_handler(_: Request, exc: InvalidAccessTokenException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "Invalid access token",
            "error": InvalidAccessTokenException.__name__
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
