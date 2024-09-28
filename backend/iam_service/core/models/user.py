import datetime
import uuid
import bcrypt
from pydantic import BaseModel

from sqlalchemy import Column, DateTime, String, Uuid, func, Integer

from core import Base


class UserPublicData(BaseModel):
	id: uuid.UUID


class User(Base):
	__tablename__ = "users"

	id: uuid.UUID = Column(Uuid, primary_key=True, default=uuid.uuid4)
	email = Column(String, unique=True, nullable=False)
	password_hash = Column(String, nullable=False)
	character_gender = Column(String, nullable=False)
	character_hair_index = Column(Integer, nullable=False)
	character_shirt_index = Column(Integer, nullable=False)
	character_pants_index = Column(Integer, nullable=False)
	created_at: datetime = Column(DateTime(timezone=True), default=func.now())
	updated_at: datetime = Column(DateTime(timezone=True), nullable=True, default=func.now())

	def set_password(self, password):
		self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


	def check_password(self, password) -> bool:
		return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
