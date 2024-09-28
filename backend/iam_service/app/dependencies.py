from core.db.postgres_connector import PostgresConnector
from core.db.repositories.users import UsersRepository
from core.settings import Settings
from core.usecases.auth import AuthUseCase
from core.utils.token import TokenUtils

settings = Settings()
postgres_connector = PostgresConnector(postgres_url=settings.postgres_url)
users_repository = UsersRepository(postgres_connector.session)
token_utils = TokenUtils(settings)
auth_usecase = AuthUseCase(users_repository=users_repository, token_utils=token_utils)

def get_auth_usecase():
	return auth_usecase
