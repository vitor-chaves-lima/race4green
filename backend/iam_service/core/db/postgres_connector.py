from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from core import Base


class PostgresConnector:
	def __init__(self, postgres_url: str):
		self.engine = create_engine(postgres_url)

		Base.metadata.create_all(self.engine)

		self.session_factory = sessionmaker(bind=self.engine)
		self.session = scoped_session(self.session_factory)


	def get_session(self):
		return self.session()
