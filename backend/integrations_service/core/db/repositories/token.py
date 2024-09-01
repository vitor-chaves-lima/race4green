from datetime import datetime, timedelta, UTC
from core.db.redis_connector import RedisConnector
from core.models.token import Token


class TokenRepository:
	_connector: RedisConnector

	def __init__(self, connector: RedisConnector):
		self._connector = connector


	def store(self, token: Token):
		key = f"{token.user_id}/tokens/tiktok/{token.token_type.value}"

		self._connector.client.setex(key, token.expires_in, token.value)
