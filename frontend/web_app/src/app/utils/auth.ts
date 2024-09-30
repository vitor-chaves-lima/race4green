import { API_GATEWAY_URL } from "@/app/utils/consts.ts";
import { UnauthorizedError } from "@/app/utils/exceptions.ts";

/*----------------- AUTH ----------------*/
const REFRESH_TOKEN_URL = new URL("/iam/refresh", API_GATEWAY_URL);

const isAuthenticated = (): boolean => {
	const accessToken = localStorage.getItem("accessToken");
	const accessTokenExpiresAt = localStorage.getItem("accessTokenExpiresAt");
	const refreshToken = localStorage.getItem("refreshToken");

	return (
		accessToken !== null ||
		accessTokenExpiresAt !== null ||
		refreshToken !== null
	);
};

const clearTokens = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("accessTokenExpiresAt");
	localStorage.removeItem("refreshToken");
};

const setTokens = (
	accessToken: string,
	accessTokenExpiresAt: string,
	refreshToken: string,
) => {
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("accessTokenExpiresAt", accessTokenExpiresAt);
	localStorage.setItem("refreshToken", refreshToken);
};

const refresh = async (): Promise<{
	accessToken: string;
	accessTokenExpiresAt: string;
}> => {
	const refreshToken = localStorage.getItem("refreshToken");

	const response = await fetch(REFRESH_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refreshToken,
		}),
	});

	const responseJson = await response.json();

	return {
		accessToken: responseJson["accessToken"],
		accessTokenExpiresAt: responseJson["accessTokenExpiresAt"],
	};
};

const getAccessToken = async (): Promise<string> => {
	const accessTokenExpiresAt = localStorage.getItem("accessTokenExpiresAt");

	if (accessTokenExpiresAt === null) {
		throw new UnauthorizedError();
	}

	const currentTime = Math.floor(Date.now() / 1000);
	const timeDifference = parseInt(accessTokenExpiresAt) - currentTime;

	if (timeDifference > 60) {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken === null) {
			throw new UnauthorizedError();
		}

		return accessToken;
	}

	const newAccessToken = await refresh();

	localStorage.setItem("accessToken", newAccessToken["accessToken"]);
	localStorage.setItem(
		"accessTokenExpiresAt",
		newAccessToken["accessTokenExpiresAt"],
	);

	return newAccessToken.accessToken;
};

/*----------------- EXPORTS -----------------*/

export { isAuthenticated, clearTokens, setTokens, getAccessToken };
