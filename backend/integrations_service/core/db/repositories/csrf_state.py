from typing import Union
from core.db.redis_connector import RedisConnector
from core.models.tiktok_integration import TikTokToken, TikTokUser
from core.models.user import User


class CSRFStateRepository:
	_connector: RedisConnector

	def __init__(self, connector: RedisConnector):
		self._connector = connector


	def store_state(self, user: User, state: str):
		key = f"{user.user_id}/csrf/tiktok"

		self._connector.client.setex(key, 600, state)


	def get_state(self, user: User) -> str:
		key = f"{user.user_id}/csrf/tiktok"

		state = self._connector.client.get(key)

		return state
