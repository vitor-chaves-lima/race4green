/*----------------- IMPORTS -----------------*/

import { ActionFunction, redirect } from "react-router-dom";

import { HttpRequestError, IntegrationInitError } from "@/lib/exceptions.ts";
import { API_GATEWAY_URL } from "@/lib/consts.ts";

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_INIT = new URL(
	"/integrations/tiktok/init",
	API_GATEWAY_URL,
);
const TIKTOK_INTEGRATION_DISCONNECT = new URL(
	"/integrations/tiktok",
	API_GATEWAY_URL,
);

/*----------------- FETCHERS ----------------*/

const fetcherTiktokIntegrationInitEndpoint = async () => {
	const response = await fetch(TIKTOK_INTEGRATION_INIT).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	if (!response.ok) {
		const responseJson = await response.json();
		throw new IntegrationInitError(responseJson.stringify());
	}

	const { authorizeUrl } = await response.json();
	return redirect(authorizeUrl);
};

const fetcherTiktokIntegrationDisconnectEndpoint = async () => {
	const response = await fetch(TIKTOK_INTEGRATION_DISCONNECT, {
		method: "DELETE",
	}).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	if (!response.ok) {
		const responseJson = await response.json();
		throw new IntegrationInitError(responseJson.stringify());
	}

	return null;
};

/*----------------- ACTIONS -----------------*/

const tikTokIntegrationInitAction: ActionFunction = async () => {
	return await fetcherTiktokIntegrationInitEndpoint();
};

const tikTokIntegrationDisconnectAction: ActionFunction = async () => {
	return await fetcherTiktokIntegrationDisconnectEndpoint();
};

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationInitAction, tikTokIntegrationDisconnectAction };
