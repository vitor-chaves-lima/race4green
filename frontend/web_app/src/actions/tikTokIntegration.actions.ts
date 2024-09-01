/*----------------- IMPORTS -----------------*/

import { ActionFunction, redirect } from "react-router-dom";


/*----------------- ACTIONS -----------------*/

const tikTokIntegrationAuthorizeAction: ActionFunction = async () => {
	const clientKey = "sbawgik9wknh769zea";
	const scope = "user.info.basic";
	const redirectURI = "https://octopus-immense-truly.ngrok-free.app/integrations/tiktok/callback";

	const array = new Uint8Array(30);
	const state = window.crypto.getRandomValues(array);

	const codeChallenge = "test";

	const tikTokAuthorizeURL = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=${scope}&redirect_uri=${redirectURI}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
	return redirect(tikTokAuthorizeURL);
}


/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationAuthorizeAction };
