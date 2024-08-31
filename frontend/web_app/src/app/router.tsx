/*----------------- IMPORTS -----------------*/

import { RouteObject, createBrowserRouter } from "react-router-dom";
import { icons } from "lucide-react";

import DashboardLayout from "../layouts/Dashboard.layout";

/*-------------- INTERFACES --------------*/

interface MenuItem {
	icon: keyof typeof icons;
	label: string;
	to: string;
}

/*----------------- ROUTES -----------------*/

const collectiblesRoute: RouteObject = {
	path: "collectibles",
	element: <h1>Colecionáveis</h1>,
};

const integrationsRoute: RouteObject = {
	path: "integrations",
	element: <h1>Integrações</h1>,
};

/*----------------- ROUTER -----------------*/

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardLayout />,
		children: [collectiblesRoute, integrationsRoute],
	},
]);

/*--------------- MENU ITEMS ---------------*/

const menuItems: MenuItem[] = [
	{
		icon: "BookHeart",
		label: "Colecionáveis",
		to: `/${collectiblesRoute.path}`,
	},
	{
		icon: "Cable",
		label: "Integrações",
		to: `/${integrationsRoute.path}`,
	},
];

/*----------------- EXPORTS -----------------*/

export { router, menuItems };
export type { MenuItem };
