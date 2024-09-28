class EmailExistsException(Exception):
    def __init__(self, email: str):
        self.email = email


class EmailNotFoundException(Exception):
    def __init__(self, email: str):
        self.email = email


class InvalidPasswordConfirmException(Exception):
    ...


class InvalidCredentialsException(Exception):
    ...


class ExpiredRefreshTokenException(Exception):
    ...


class InvalidRefreshTokenException(Exception):
    ...


class ExpiredAccessTokenException(Exception):
    ...


class InvalidAccessTokenException(Exception):
    ...
