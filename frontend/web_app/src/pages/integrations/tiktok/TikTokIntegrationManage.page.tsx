/*----------------- IMPORTS -----------------*/

import React, {useEffect} from "react";

import {useFetcher, useRouteError} from "react-router-dom";

import {HttpRequestError} from "@/lib/exceptions.ts";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons"
import {useToast} from "@/components/hooks/use-toast.ts";

/*------------- ERROR HANDLING --------------*/

const handleErrorText = (error: unknown): string => {
	if (error instanceof  HttpRequestError) {
		return "Não foi possível se comunicar com a API"
	}

	return "Erro desconhecido"
}

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationManagePage: React.FC = () => {
	const fetcher = useFetcher();
	const { toast } = useToast()
	const routeError = useRouteError();

	const handleIntegrateButtonClick = () => {
		fetcher.submit(null, {
			method: "POST",
			action: "/integrations/tiktok/authorize",
		});
	};

	useEffect(() => {
		if (routeError) {

			toast({
				variant: "destructive",
				title: "Erro",
				description: handleErrorText(routeError),
			})
		}
	}, [toast, routeError]);


	return (
		<div className="flex flex-col h-full gap-6">
			<Button variant={"default"} onClick={handleIntegrateButtonClick} disabled={fetcher.state === "submitting"}>
				{fetcher.state === "submitting" && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
				Integrar
			</Button>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationManagePage };
