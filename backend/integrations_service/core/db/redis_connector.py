import redis
from pydantic import RedisDsn


class RedisConnector:
    def __init__(self, redis_url: RedisDsn):
        self.client = redis.from_url(redis_url, decode_responses=True)
