/*----------------- IMPORTS -----------------*/

import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";

import {
	HttpRequestError,
	IntegrationInitError,
} from "@/app/utils/exceptions.ts";
import { API_GATEWAY_URL } from "@/app/utils/consts.ts";
import { setTokens } from "@/app/utils/auth.ts";

/*---------------- ENDPOINTS ----------------*/

const SIGN_IN = new URL("/iam/sign-in", API_GATEWAY_URL);
const SIGN_UP = new URL("/iam/sign-up", API_GATEWAY_URL);

/*----------------- FETCHERS ----------------*/

const fetcherSignInEndpoint = async (email: string, password: string) => {
	const response = await fetch(SIGN_IN, {
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

const fetcherSignUpEndpoint = async (
	email: string,
	password: string,
	passwordConfirm: string,
) => {
	const characterGender = "male";
	const characterHairIndex = 0;
	const characterShirtIndex = 0;
	const characterPantsIndex = 0;

	const response = await fetch(SIGN_UP, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
			passwordConfirm,
			characterGender,
			characterHairIndex,
			characterShirtIndex,
			characterPantsIndex,
		}),
	}).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	if (!response.ok) {
		const responseJson = await response.json();
		throw new IntegrationInitError(responseJson.stringify());
	}

	return await fetcherSignInEndpoint(email, password);
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

const signUpAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs) => {
	const requestJson = await request.json();
	const email = requestJson.email;
	const password = requestJson.password;
	const passwordConfirm = requestJson.password;

	return await fetcherSignUpEndpoint(email, password, passwordConfirm);
};

/*----------------- EXPORTS -----------------*/

export { signInAction, signUpAction };
