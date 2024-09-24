from typing import Union, Optional

import requests
from core.settings import TikTokIntegrationSettings
from core.models.tiktok_integration import TokenRequest, TokenResponse, TikTokToken, RefreshTokenRequest, \
	VideosListRequest, TikTokVideosListResponse, TikTokVideoData
from core.exceptions import TokenException


class TikTokIntegrationService:

	_settings: TikTokIntegrationSettings

	def __init__(self, tiktok_integration_settings: TikTokIntegrationSettings):
		self._settings = tiktok_integration_settings


	def _token_request(self, request_data: Union[TokenRequest, RefreshTokenRequest]) -> TokenResponse:
		response = requests.request(
			method="POST",
			url=self._settings.token_uri,
			headers={
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data=request_data.model_dump())

		response_data = response.json()

		if "error" in response_data:
			raise TokenException(response_data.get("error"), response_data.get("error_description"))

		token_response = TokenResponse.from_dict(response_data)
		return token_response


	def get_token(self, code: str) -> TokenResponse:
		request_data = TokenRequest(
			client_key=self._settings.client_key,
			client_secret=self._settings.client_secret,
			code=code,
			grant_type="authorization_code",
			redirect_uri=self._settings.redirect_uri,
		)

		return self._token_request(request_data)


	def refresh_token(self, refresh_token: TikTokToken) -> TokenResponse:
		request_data = RefreshTokenRequest(
			client_key=self._settings.client_key,
			client_secret=self._settings.client_secret,
			grant_type="refresh_token",
			refresh_token=refresh_token.value,
		)

		return self._token_request(request_data)


	def get_videos_list(self, access_token: TikTokToken, cursor: Optional[int]) -> TikTokVideosListResponse:
		request_data = VideosListRequest(max_count=10, cursor=cursor)

		response = requests.request(
			method="POST",
			url="https://open.tiktokapis.com/v2/video/list/?fields=cover_image_url,id,title,create_time,video_description",
			headers={
				"Authorization": "Bearer " + access_token.value,
				"Content-Type": "application/json"
			},
			data=request_data.model_dump_json(exclude_none=True))

		response_json = response.json()

		if response_json["error"]["code"] != "ok":
			raise TokenException(response_json.get("error"), response_json.get("error_description"))

		response_data = response_json["data"]

		tiktok_videos_list = TikTokVideosListResponse(
			videos=[TikTokVideoData(
				id=v["id"],
				title=v["title"],
				description=v["video_description"],
				cover_image_url=v["cover_image_url"],
				create_timestamp=v["create_time"]
			) for v in response_data["videos"]],
			cursor=response_data["cursor"],
			has_more=response_data["has_more"]
		)

		return tiktok_videos_list
