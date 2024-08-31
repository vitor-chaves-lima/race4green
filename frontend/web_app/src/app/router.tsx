/*----------------- IMPORTS -----------------*/

import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/Dashboard.layout";

/*----------------- ROUTER -----------------*/

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardLayout />,
		children: [
			{
				path: "integrations",
				element: <h1>Integrações</h1>,
			},
		],
	},
]);

/*----------------- EXPORTS -----------------*/

export default router;
