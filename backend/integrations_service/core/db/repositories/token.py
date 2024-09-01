from typing import Union
from core.db.redis_connector import RedisConnector
from core.models.token import Token, TokenType


class TokenRepository:
	_connector: RedisConnector

	def __init__(self, connector: RedisConnector):
		self._connector = connector


	def store(self, token: Token):
		key = f"{token.user_id}/tokens/tiktok/{token.token_type.value}"

		self._connector.client.setex(key, token.expires_in, token.value)


	def get_token(self, user_id: str, token_type: TokenType) -> Union[Token, None]:
		key = f"{user_id}/tokens/tiktok/{token_type.value}"

		token_value = self._connector.client.getex(key)
		token_expires_in = self._connector.client.ttl(key)

		return Token(user_id=user_id, value=token_value, expires_in=token_expires_in, token_type=token_type)

