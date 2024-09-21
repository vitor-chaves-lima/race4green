import requests
from core.settings import TikTokIntegrationSettings
from core.models.tiktok_integration import TokenRequest, TokenResponse
from core.exceptions import TokenException


class TikTokIntegrationService:

	_settings: TikTokIntegrationSettings

	def __init__(self, tiktok_integration_settings: TikTokIntegrationSettings):
		self._settings = tiktok_integration_settings


	def get_token(self, code: str) -> TokenResponse:
		request_data = TokenRequest(
			client_key=self._settings.client_key,
			client_secret=self._settings.client_secret,
			code=code,
			grant_type="authorization_code",
			redirect_uri=self._settings.redirect_uri,
		)

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
