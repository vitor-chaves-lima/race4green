from datetime import timedelta, datetime, timezone
from uuid import UUID

import jwt

from core.exceptions import ExpiredAccessTokenException, InvalidAccessTokenException, ExpiredRefreshTokenException, \
	InvalidRefreshTokenException
from core.models.user import UserPublicData
from core.settings import Settings


class TokenUtils:
	_access_token_secret: str
	_refresh_token_secret: str


	def __init__(self, settings: Settings):
		self._refresh_token_secret = settings.refresh_token_secret
		self._access_token_secret = settings.access_token_secret


	def create_access_token(self, user_id: UUID, expires_delta_minutes=15):
		expires_delta = timedelta(minutes=expires_delta_minutes)
		expire = (datetime.now(timezone.utc) + expires_delta).timestamp()
		to_encode = {
			"userId": str(user_id),
		}
		to_encode.update({"exp": expire})
		encoded_jwt = jwt.encode(to_encode, self._access_token_secret, algorithm="HS256")
		return encoded_jwt


	def create_refresh_token(self, user_id: UUID):
		expires_delta = timedelta(days=1)
		expire = (datetime.now(timezone.utc) + expires_delta).timestamp()
		to_encode = {
			"userId": str(user_id),
		}
		to_encode.update({"exp": expire})
		encoded_jwt = jwt.encode(to_encode, self._refresh_token_secret, algorithm="HS256")
		return encoded_jwt


	def validate_refresh_token(self, refresh_token: str) -> (bool, str):
		try:
			decoded_token = jwt.decode(refresh_token, self._refresh_token_secret, algorithms=["HS256"])

			now = datetime.now(timezone.utc)
			exp = datetime.fromtimestamp(decoded_token["exp"], tz=timezone.utc)

			if now > exp:
				raise ExpiredRefreshTokenException()

			user_id = decoded_token["userId"]
			return True, user_id

		except jwt.ExpiredSignatureError:
			raise ExpiredRefreshTokenException()
		except jwt.InvalidTokenError:
			raise InvalidRefreshTokenException()


	def validate_access_token(self, access_token: str) -> UserPublicData:
		try:
			decoded_token = jwt.decode(access_token, self._access_token_secret, algorithms=["HS256"])

			now = datetime.now(timezone.utc)
			exp = datetime.fromtimestamp(decoded_token["exp"], tz=timezone.utc)

			if now > exp:
				raise ExpiredAccessTokenException()

			return UserPublicData(id=decoded_token['id'])

		except jwt.ExpiredSignatureError:
			raise ExpiredAccessTokenException()
		except jwt.InvalidTokenError:
			raise InvalidAccessTokenException()
