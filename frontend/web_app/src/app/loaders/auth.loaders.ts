/*----------------- IMPORTS -----------------*/

import { LoaderFunction, redirect } from "react-router-dom";
import { isAuthenticated } from "@/app/utils/auth.ts";

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

/*----------------- EXPORTS -----------------*/

export { dashboardLoader, authLoader };
