/*----------------- IMPORTS -----------------*/

import { ActionFunction, redirect } from "react-router-dom";

import { API_GATEWAY_URL } from "@/lib/consts.ts"
import {HttpRequestError} from "@/lib/exceptions.ts";

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_INIT =  new URL("/integrations/tiktok/init", API_GATEWAY_URL)

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

		const {authorizeUrl} = await response.json();
		return redirect(authorizeUrl);
	} catch (error) {
		console.error("Something wrong happened during the request", error)

		throw new HttpRequestError();
	}
}

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationAuthorizeAction };
