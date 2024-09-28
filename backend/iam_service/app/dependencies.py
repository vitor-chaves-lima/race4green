from core.db.postgres_connector import PostgresConnector
from core.db.repositories.users import UsersRepository
from core.settings import Settings

settings = Settings()
postgres_connector = PostgresConnector(postgres_url=settings.postgres_url)
users_repository = UsersRepository(postgres_connector.session)

def get_users_repository():
	return users_repository
