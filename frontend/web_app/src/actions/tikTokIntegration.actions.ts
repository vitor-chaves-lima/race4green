/*----------------- IMPORTS -----------------*/

import { ActionFunction, redirect } from "react-router-dom";

import { API_GATEWAY_URL } from "@/lib/consts.ts"
import {HttpRequestError} from "@/lib/exceptions.ts";

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_INIT = `${API_GATEWAY_URL}/integrations/tiktok/init`

/*----------------- ACTIONS -----------------*/

const tikTokIntegrationAuthorizeAction: ActionFunction = async () => {
	try {
		const response = await fetch(TIKTOK_INTEGRATION_INIT)

		if (!response.ok) {
			// TODO: Melhorar tratamento de erros do Endpoint
			return redirect("/integrations/tiktok/manage", {
				status: response.status,
			});
		}

		const {tiktokAuthorizeURL} = await response.json();

		return redirect(tiktokAuthorizeURL);
	} catch (error) {
		console.error("Something wrong happened during the request", error)

		throw new HttpRequestError();
	}
}

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationAuthorizeAction };
