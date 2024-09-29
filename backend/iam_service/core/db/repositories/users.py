from typing import Union

from requests import Session
from sqlalchemy.orm import scoped_session

from core.models.user import User


class UsersRepository:
	_session: scoped_session[Session]

	def __init__(self, session: scoped_session[Session]):
		self._session = session


	def find_by_id(self, user_id: str) -> Union[User, None]:
		return self._session.query(User).filter(User.id == user_id).first()


	def find_by_email(self, email: str) -> Union[User, None]:
		return self._session.query(User).filter(User.email == email).first()


	def exists_by_email(self, email: str) -> bool:
		return self._session.query(User).filter(User.email == email).first() is not None


	def save(self, user: User) -> User:
		self._session.add(user)
		self._session.commit()
		return user
