/*----------------- IMPORTS -----------------*/

import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";

import { HttpRequestError, IntegrationInitError } from "@/lib/exceptions.ts";
import { API_GATEWAY_URL } from "@/lib/consts.ts";
import { setTokens } from "@/lib/auth.ts";

/*---------------- ENDPOINTS ----------------*/

const SIGN_IN_INIT = new URL("/iam/sign-in", API_GATEWAY_URL);

/*----------------- FETCHERS ----------------*/

const fetcherSignInEndpoint = async (email: string, password: string) => {
	const response = await fetch(SIGN_IN_INIT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	}).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	if (!response.ok) {
		const responseJson = await response.json();
		throw new IntegrationInitError(responseJson.stringify());
	}

	const responseJson = await response.json();

	const currentTimestamp = Math.floor(Date.now() / 1000);
	const expiresAt = currentTimestamp + responseJson["accessTokenExpiresAt"];

	setTokens(
		responseJson["accessToken"],
		expiresAt,
		responseJson["refreshToken"],
	);

	return redirect("/dashboard");
};

/*----------------- ACTIONS -----------------*/

const signInAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs) => {
	const requestJson = await request.json();
	const email = requestJson.email;
	const password = requestJson.password;

	return await fetcherSignInEndpoint(email, password);
};

/*----------------- EXPORTS -----------------*/

export { signInAction };
