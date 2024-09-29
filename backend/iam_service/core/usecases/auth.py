from core.db.repositories.users import UsersRepository
from core.exceptions import InvalidPasswordConfirmException, EmailExistsException, EmailNotFoundException, \
	InvalidCredentialsException, InvalidRefreshTokenException, InvalidAccessTokenException
from core.models.user import User
from core.utils.token import TokenUtils


class AuthUseCase:
	_users_repository: UsersRepository
	_token_utils: TokenUtils

	def __init__(self, users_repository: UsersRepository, token_utils: TokenUtils):
		self._users_repository = users_repository
		self._token_utils = token_utils


	def sign_up(self,
				email: str,
				password: str,
				password_confirm: str,
				character_gender: str,
				character_hair_index: int,
				character_shirt_index: int,
				character_pants_index: int
				):
		if password != password_confirm:
			raise InvalidPasswordConfirmException()

		email_exists = self._users_repository.exists_by_email(email)
		if email_exists is True:
			raise EmailExistsException(email)

		new_user = User(email=email,
						character_gender=character_gender,
						character_hair_index=character_hair_index,
						character_shirt_index=character_shirt_index,
						character_pants_index=character_pants_index)

		new_user.set_password(password)
		self._users_repository.save(new_user)


	def sign_in(self, email: str, password: str):
		user = self._users_repository.find_by_email(email=email)
		if user is None:
			raise EmailNotFoundException(email)

		valid_credentials = user.check_password(password)
		if valid_credentials is False:
			raise InvalidCredentialsException()

		refresh_token = self._token_utils.create_refresh_token(user.id)
		access_token = self._token_utils.create_access_token(user.id)
		access_token_expire = 900

		return refresh_token, access_token, access_token_expire


	def refresh_token(self, refresh_token: str):
		is_refresh_token_valid, user_id = self._token_utils.validate_refresh_token(refresh_token)

		if not is_refresh_token_valid:
			raise InvalidRefreshTokenException()

		access_token = self._token_utils.create_access_token(user_id)
		access_token_expire = 900

		return access_token, access_token_expire


	def validate_access_token(self, access_token: str) -> str:
		is_access_token_valid, user_id = self._token_utils.validate_access_token(access_token)

		if not is_access_token_valid:
			raise InvalidAccessTokenException()

		return user_id


	def get_user_data(self, user_id: str) -> (str, int, int, int):
		user = self._users_repository.find_by_id(user_id=user_id)

		return (user.character_gender,
				user.character_hair_index,
				user.character_shirt_index,
				user.character_pants_index)
