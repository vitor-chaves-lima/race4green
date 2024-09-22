/*----------------- IMPORTS -----------------*/

import { LoaderFunction, LoaderFunctionArgs, defer } from "react-router-dom";

import {
	CallbackTikTokError,
	CallbackValidationError,
	HttpRequestError,
	InvalidCallbackDataError,
} from "@/lib/exceptions.ts";

import { API_GATEWAY_URL } from "@/lib/consts.ts";

/*------------------ TYPES ------------------*/

export type TikTokIntegrationStatus = "connected" | "notConnected";

export type TikTokStatusLoaderReturn = { status: TikTokIntegrationStatus };
export type TikTokCallbackLoaderReturn = { data: Promise<void> };

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_STATUS = new URL(
	"/integrations/tiktok",
	API_GATEWAY_URL,
);

const TIKTOK_INTEGRATION_CALLBACK = (code: string, state: string) =>
	new URL(
		`/integrations/tiktok/callback?code=${code}&state=${state}`,
		API_GATEWAY_URL,
	);

/*----------------- FETCHERS ----------------*/

const fetchIntegrationStatusEndpoint = async () => {
	const response = await fetch(TIKTOK_INTEGRATION_STATUS, {
		method: "GET",
	}).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	if (!response.ok) {
		const errorData = await response.json();
		console.error("Something wrong happened during the request", errorData);
		throw new CallbackValidationError(errorData["message"]);
	}

	const responseJson = await response.json();
	return responseJson["status"];
};

const fetchCallbackEndpoint = async (
	error: string | null,
	errorDescription: string | null,
	code: string | null,
	state: string | null,
) => {
	if (error) {
		console.error("Something wrong happened during the request", error);
		throw new CallbackTikTokError(error, errorDescription || undefined);
	}

	if (!state) {
		throw new InvalidCallbackDataError();
	}

	if (!code) {
		throw new InvalidCallbackDataError();
	}

	const response = await fetch(TIKTOK_INTEGRATION_CALLBACK(code, state), {
		method: "POST",
	}).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	if (!response.ok) {
		const errorData = await response.json();
		console.error("Something wrong happened during the request", errorData);
		throw new CallbackValidationError(errorData["message"]);
	}

	return null;
};

/*----------------- LOADERS -----------------*/

const tikTokIntegrationStatusLoader: LoaderFunction = async () => {
	return {
		status: fetchIntegrationStatusEndpoint(),
	};
};

const tikTokIntegrationCallbackLoader: LoaderFunction = async ({
	request,
}: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const error = url.searchParams.get("error");
	const errorDescription = url.searchParams.get("errorDescription");
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	return defer({
		data: fetchCallbackEndpoint(error, errorDescription, code, state),
	});
};

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationStatusLoader, tikTokIntegrationCallbackLoader };
