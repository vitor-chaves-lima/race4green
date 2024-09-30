/*----------------- IMPORTS -----------------*/

import {
	Navigate,
	Outlet,
	RouteObject,
	createBrowserRouter,
} from "react-router-dom";
import { icons } from "lucide-react";

import { Toaster } from "@/app/components/ui/toaster.tsx";

import { DashboardLayout } from "@/app/layouts/Dashboard.layout";
import { IntegrationLayout } from "@/app/layouts/Integration.layout.tsx";

import {
	TikTokIntegrationManageErrorElement,
	TikTokIntegrationManagePage,
} from "@/app/pages/integrations/tiktok/TikTokIntegrationManage.page";
import { IntegrationsIndexPage } from "@/app/pages/integrations/Index.page";
import { TikTokIntegrationCallbackPage } from "@/app/pages/integrations/tiktok/TikTokIntegrationCallback.page.tsx";

import {
	tikTokIntegrationDisconnectAction,
	tikTokIntegrationInitAction,
	tikTokIntegrationSyncAction,
} from "@/app/actions/tikTokIntegration.actions";

import {
	tikTokIntegrationCallbackLoader,
	tikTokIntegrationLoader,
} from "@/app/loaders/tikTokIntegration.loaders";
import { AuthLayout } from "@/app/layouts/Auth.layout.tsx";
import { SignInPage } from "@/app/pages/auth/sign-in.page.tsx";
import { signInAction } from "@/app/actions/auth.actions.ts";

import { authLoader, dashboardLoader } from "@/app/loaders/auth.loaders.ts";
import { CollectiblesPage } from "@/app/pages/Collectibles.tsx";

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
	element: <CollectiblesPage />,
};

const integrationsRoute: RouteObject = {
	path: "integrations",
	children: [
		{
			element: <IntegrationsIndexPage />,
			index: true,
		},
		{
			element: (
				<IntegrationLayout
					title="TikTok"
					backButtonPath="/dashboard/integrations"
					subRouteTitles={
						new Map([
							["tiktok/manage", "Gerenciar"],
							["tiktok/about", "Saiba Mais"],
						])
					}
				/>
			),
			path: "tiktok",
			children: [
				{
					path: "manage",
					element: <TikTokIntegrationManagePage />,
					errorElement: <TikTokIntegrationManageErrorElement />,
					loader: tikTokIntegrationLoader,
				},
				{
					path: "callback",
					element: <TikTokIntegrationCallbackPage />,
					loader: tikTokIntegrationCallbackLoader,
				},
				{
					path: "about",
					element: <h1>Saiba Mais</h1>,
				},
			],
		},
	],
};

const dashboardRoutes: RouteObject = {
	path: "/dashboard",
	loader: dashboardLoader,
	element: (
		<>
			<DashboardLayout />
		</>
	),
	children: [collectiblesRoute, integrationsRoute],
};

const authRoutes: RouteObject = {
	path: "/auth",
	loader: authLoader,
	element: (
		<>
			<AuthLayout />
		</>
	),
	children: [
		{
			path: "sign-in",
			element: <SignInPage />,
		},
	],
};

const apiRoutes: RouteObject = {
	path: "/api",
	children: [
		{
			path: "integrations",
			children: [
				{
					path: "tiktok",
					children: [
						{
							path: "init",
							action: tikTokIntegrationInitAction,
						},
						{
							path: "disconnect",
							action: tikTokIntegrationDisconnectAction,
						},
						{
							path: "sync",
							action: tikTokIntegrationSyncAction,
						},
					],
				},
			],
		},
		{
			path: "iam",
			children: [
				{
					path: "sign-in",
					action: signInAction,
				},
			],
		},
	],
};

/*----------------- ROUTER -----------------*/

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Outlet />
				<Toaster />
			</>
		),
		children: [
			{
				index: true,
				element: <Navigate to="/dashboard" replace={true}></Navigate>,
			},
			apiRoutes,
			authRoutes,
			dashboardRoutes,
		],
	},
]);

/*--------------- MENU ITEMS ---------------*/

const menuItems: MenuItem[] = [
	{
		icon: "BookHeart",
		label: "Colecionáveis",
		to: `${collectiblesRoute.path}`,
		selectCheck: (pathname: string) =>
			pathname.includes(`${collectiblesRoute.path}`),
	},
	{
		icon: "Cable",
		label: "Integrações",
		to: `${integrationsRoute.path}`,
		selectCheck: (pathname: string) => {
			return pathname.includes(`${integrationsRoute.path}`);
		},
	},
];

/*----------------- EXPORTS -----------------*/

export { router, menuItems };
export type { MenuItem };
