/*----------------- IMPORTS -----------------*/

import { ActionFunction, redirect } from "react-router-dom";

import { API_GATEWAY_URL } from "@/lib/consts.ts"

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_INIT = `${API_GATEWAY_URL}/integrations/tiktok/init`

/*----------------- ACTIONS -----------------*/

const tikTokIntegrationAuthorizeAction: ActionFunction = async () => {
	console.log(TIKTOK_INTEGRATION_INIT)
	const response = await fetch(TIKTOK_INTEGRATION_INIT);

	if (!response.ok) {
		throw response;
	}

	const { tiktokAuthorizeURL } = await response.json();

	return redirect(tiktokAuthorizeURL);
}

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationAuthorizeAction };
