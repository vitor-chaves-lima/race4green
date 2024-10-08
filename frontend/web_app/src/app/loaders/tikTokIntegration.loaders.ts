/*----------------- IMPORTS -----------------*/

import { LoaderFunction, LoaderFunctionArgs, defer } from "react-router-dom";

import {
	CallbackTikTokError,
	CallbackValidationError,
	HttpRequestError,
	InvalidCallbackDataError,
} from "@/app/utils/exceptions.ts";

import { API_GATEWAY_URL } from "@/app/utils/consts.ts";
import { getAccessToken } from "@/app/utils/auth.ts";

/*------------------ TYPES ------------------*/

export type TikTokIntegrationStatus = "connected" | "notConnected";

export type TikTokLoaderReturn = {
	status: TikTokIntegrationStatus;
	videos: Promise<[TikTokVideo]>;
};
export type TikTokCallbackLoaderReturn = { data: Promise<void> };

export type TikTokVideo = {
	cover_image_url: string;
	id: string;
	title: string;
};

/*---------------- ENDPOINTS ----------------*/

const TIKTOK_INTEGRATION_STATUS = new URL(
	"/integrations/tiktok",
	API_GATEWAY_URL,
);

const TIKTOK_INTEGRATION_VIDEOS = new URL(
	"/integrations/tiktok/videos",
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
		headers: {
			Authorization: `Bearer ${await getAccessToken()}`,
		},
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

const fetchIntegrationVideosEndpoint = async (): Promise<[TikTokVideo]> => {
	const response = await fetch(TIKTOK_INTEGRATION_VIDEOS, {
		headers: {
			Authorization: `Bearer ${await getAccessToken()}`,
		},
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

	return responseJson["videos"];
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
		headers: {
			Authorization: `Bearer ${await getAccessToken()}`,
		},
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

const tikTokIntegrationLoader: LoaderFunction = async () => {
	return defer({
		status: await fetchIntegrationStatusEndpoint(),
		videos: fetchIntegrationVideosEndpoint(),
	});
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

export { tikTokIntegrationLoader, tikTokIntegrationCallbackLoader };
