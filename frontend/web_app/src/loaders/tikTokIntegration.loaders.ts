/*----------------- IMPORTS -----------------*/

import { LoaderFunction, LoaderFunctionArgs, redirect } from "react-router-dom";

/*----------------- LOADERS -----------------*/

const tikTokIntegrationCallbackLoader: LoaderFunction = async ({
	request,
}: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	console.log(code)

	if (code && state) {
		return redirect("/integrations/tiktok/manage");
	}

	throw new Response("Invalid params", { status: 400 });
};

/*----------------- EXPORTS -----------------*/

export { tikTokIntegrationCallbackLoader };
