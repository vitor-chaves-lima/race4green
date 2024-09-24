from pymongo import MongoClient


class MongoConnector:
    def __init__(self, mongo_url: str):
        self.client = MongoClient(mongo_url)
        self.db = self.client["sync"]
        self.collection = self.db["tiktok"]
