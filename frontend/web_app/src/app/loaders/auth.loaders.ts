/*----------------- IMPORTS -----------------*/

import { LoaderFunction, defer, redirect } from "react-router-dom";
import { getAccessToken, isAuthenticated } from "@/app/utils/auth.ts";
import { API_GATEWAY_URL } from "@/app/utils/consts.ts";
import { HttpRequestError } from "@/app/utils/exceptions.ts";

/*---------------- ENDPOINTS ----------------*/

const USER_DATA = new URL("/iam/user-data", API_GATEWAY_URL);

/*------------------ TYPES ------------------*/

export type UserData = {
	characterGender: string;
	characterHair: number;
	characterShirt: number;
	characterPants: number;
};

/*----------------- FETCHERS ----------------*/

const fetchUserDataEndpoint = async (): Promise<UserData> => {
	const response = await fetch(USER_DATA, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${await getAccessToken()}`,
		},
	}).catch((error) => {
		console.error("Something wrong happened during the request", error);
		throw new HttpRequestError();
	});

	return await response.json();
};

/*----------------- LOADERS -----------------*/

const dashboardLoader: LoaderFunction = async () => {
	if (!isAuthenticated()) {
		return redirect("/auth/sign-in");
	}

	return null;
};

const authLoader: LoaderFunction = async () => {
	if (isAuthenticated()) {
		return redirect("/dashboard");
	}

	return null;
};

const userDataLoader: LoaderFunction = async () => {
	return defer({
		userData: fetchUserDataEndpoint(),
	});
};

/*----------------- EXPORTS -----------------*/

export { dashboardLoader, authLoader, userDataLoader };
