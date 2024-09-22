/*----------------- IMPORTS -----------------*/

import {LoaderFunction, LoaderFunctionArgs, defer} from "react-router-dom";

import {
	CallbackTikTokError,
	CallbackValidationError,
	HttpRequestError,
	InvalidCallbackDataError
} from "@/lib/exceptions.ts";

import {API_GATEWAY_URL} from "@/lib/consts.ts";

/*------------------ TYPES ------------------*/

export type TikTokCallbackLoaderReturn = { response: Promise<void> }

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_CALLBACK = (code: string, state: string) =>
	new URL(`/integrations/tiktok/callback?code=${code}&state=${state}`, API_GATEWAY_URL)

/*----------------- FETCHERS ----------------*/

const fetchCallbackEndpoint = async (
	error: string | null,
	errorDescription: string | null,
	code: string | null,
	state: string | null
) => {
	if (error) {
		console.error("Something wrong happened during the request", error)
		throw new CallbackTikTokError(error, errorDescription || undefined);
	}

	if (!state) {
		throw new InvalidCallbackDataError()
	}

	if (!code) {
		throw new InvalidCallbackDataError()
	}

	const response = await fetch(TIKTOK_INTEGRATION_CALLBACK(code, state), { method: "POST" })
		.catch(error => {
			console.error("Something wrong happened during the request", error)
			throw new HttpRequestError();
		})

	if (!response.ok) {
		const errorData = await response.json()
		console.error("Something wrong happened during the request", errorData)
		throw new CallbackValidationError(errorData["message"])
	}

	return null
}

/*----------------- LOADERS -----------------*/

const tikTokIntegrationCallbackLoader: LoaderFunction = async ({
	request,
}: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const error = url.searchParams.get("error");
	const errorDescription = url.searchParams.get("errorDescription");
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	return defer({
		response: fetchCallbackEndpoint(error, errorDescription, code, state)
	});
};

/*----------------- EXPORTS -----------------*/

export {
	tikTokIntegrationCallbackLoader,
};
