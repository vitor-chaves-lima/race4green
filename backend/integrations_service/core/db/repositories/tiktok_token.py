from typing import Union
from core.db.redis_connector import RedisConnector
from core.models.tiktok_integration import TikTokToken, TikTokUser, TikTokTokenType
from core.models.user import User


class TikTokTokenRepository:
	_connector: RedisConnector

	def __init__(self, connector: RedisConnector):
		self._connector = connector


	def store_token(self, user: User, token: TikTokToken):
		key = f"{user.user_id}/tokens/tiktok/{token.token_type.value}"

		self._connector.client.setex(key, token.expires_in, token.value)


	def store_user(self, user: User, tiktok_user: TikTokUser):
		key = f"{user.user_id}/tokens/tiktok/user_id"

		self._connector.client.set(key, tiktok_user.user_id)


	def get_token(self, user: User, token_type: TikTokTokenType) -> Union[TikTokToken, None]:
		key = f"{user.user_id}/tokens/tiktok/{token_type.value}"

		token_value = self._connector.client.getex(key)
		token_expires_in = self._connector.client.ttl(key)

		return TikTokToken(user_id=user.user_id, value=token_value, expires_in=token_expires_in, token_type=token_type)


	def get_user(self, user: User) -> Union[TikTokUser, None]:
		key = f"{user.user_id}/tokens/tiktok/user_id"

		tiktok_user_id = self._connector.client.get(key)

		if tiktok_user_id is None:
			return None

		tiktok_user = TikTokUser(user_id=tiktok_user_id)
		return tiktok_user
