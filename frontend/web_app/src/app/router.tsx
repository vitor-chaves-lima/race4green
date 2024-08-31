/*----------------- IMPORTS -----------------*/

import { RouteObject, createBrowserRouter } from "react-router-dom";
import { icons } from "lucide-react";

import { DashboardLayout } from "../layouts/Dashboard.layout";

import { IntegrationsIndexPage } from "@/pages/integrations/Index.page";

/*--------------- INTERFACES ----------------*/

interface MenuItem {
	icon: keyof typeof icons;
	label: string;
	to: string;
	selectCheck: (pathname: string) => boolean;
}

/*----------------- ROUTES -----------------*/

const collectiblesRoute: RouteObject = {
	path: "collectibles",
	element: <h1>Colecionáveis</h1>,
};

const integrationsRoute: RouteObject = {
	path: "integrations",
	children: [
		{
			element: <IntegrationsIndexPage />,
			index: true,
		},
		{
			element: <h1>Tik Tok</h1>,
			path: "tiktok",
		},
	],
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
		selectCheck: (pathname: string) =>
			pathname.includes(`${collectiblesRoute.path}`),
	},
	{
		icon: "Cable",
		label: "Integrações",
		to: `/${integrationsRoute.path}`,
		selectCheck: (pathname: string) => {
			return pathname.includes(`${integrationsRoute.path}`);
		},
	},
];

/*----------------- EXPORTS -----------------*/

export { router, menuItems };
export type { MenuItem };
