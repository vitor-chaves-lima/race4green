class CSRFStateException(Exception):
    def __init__(self):
        self.error_description = "Invalid CSRF state"


class TokenException(Exception):
    def __init__(self, error_type: str, error_description: str):
        self.error_type = error_type
        self.error_description = error_description
