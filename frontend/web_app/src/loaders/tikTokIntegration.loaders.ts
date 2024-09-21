/*----------------- IMPORTS -----------------*/

import { LoaderFunction, LoaderFunctionArgs, redirect } from "react-router-dom";

import {
	CallbackValidationError,
	HttpRequestError,
	InvalidCallbackDataError
} from "@/lib/exceptions.ts";
import {API_GATEWAY_URL} from "@/lib/consts.ts";

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_CALLBACK = (code: string, state: string) =>
	new URL(`/integrations/tiktok/callback?code=${code}&state=${state}`, API_GATEWAY_URL)

/*----------------- LOADERS -----------------*/

const tikTokIntegrationCallbackLoader: LoaderFunction = async ({
	request,
}: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	if (!state) {
		throw new InvalidCallbackDataError()
	}

	if (!code) {
		throw new InvalidCallbackDataError()
	}

	const response = await fetch(TIKTOK_INTEGRATION_CALLBACK(code, state), {
		method: "POST",
	}).catch(error => {
		console.error("Something wrong happened during the request", error)
		throw new HttpRequestError();
	})

	if (!response.ok) {
		const errorData = await response.json()
		console.error("Something wrong happened during the request", errorData)
		throw new CallbackValidationError(errorData["message"])
	}

	return redirect("/integrations/tiktok/manage");
};

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationCallbackLoader };
