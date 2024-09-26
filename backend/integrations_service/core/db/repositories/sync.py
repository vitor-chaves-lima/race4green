from typing import Union, List

from core.db.mongo_connector import MongoConnector
from core.models.tiktok_integration import TikTokVideoData
from core.models.user import User


class SyncRepository:
	def __init__(self, connector: MongoConnector):
		self._connector = connector


	def get_last_sync_timestamp(self, user: User) -> Union[int, None]:
		user_doc = self._connector.collection.find_one({"userId": user.user_id})

		if user_doc is None:
			return None

		last_sync_timestamp = user_doc.get("last_sync_timestamp")
		return last_sync_timestamp


	def update_sync_state(self, user: User, sync_timestamp: int, new_videos_list: List[TikTokVideoData]):
		dict_videos_list = [v.model_dump() for v in new_videos_list]

		self._connector.collection.update_one(
			{"userId": user.user_id},
			{
				"$set": {
					"last_sync_timestamp": sync_timestamp,
				},
				"$addToSet": {
					"videos": {"$each": dict_videos_list}
				}
			},
			upsert = True
		)


	def get_last_sync_videos(self, user: User) -> List[TikTokVideoData]:
		user_document = self._connector.collection.find_one({"userId": user.user_id})

		if user_document is None or "videos" not in user_document:
			return []

		return user_document["videos"]


	def clear_user_data(self, user: User):
		self._connector.collection.delete_one({"userId": user.user_id})
