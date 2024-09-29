/*----------------- IMPORTS -----------------*/

import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";

import { HttpRequestError, IntegrationInitError } from "@/lib/exceptions.ts";
import { API_GATEWAY_URL } from "@/lib/consts.ts";

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

	localStorage.setItem("accessToken", responseJson["accessToken"]);
	localStorage.setItem(
		"accessTokenExpiresAt",
		responseJson["accessTokenExpiresAt"],
	);
	localStorage.setItem("refreshToken", responseJson["refreshToken"]);

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
