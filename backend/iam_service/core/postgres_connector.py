from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session


class PostgresConnector:
	def __init__(self, postgres_url: str):
		self.engine = create_engine(postgres_url)

		self.session_factory = sessionmaker(bind=self.engine)
		self.Session = scoped_session(self.session_factory)


	def get_session(self):
		return self.Session()
