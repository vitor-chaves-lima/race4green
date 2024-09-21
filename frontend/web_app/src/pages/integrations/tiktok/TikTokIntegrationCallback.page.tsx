/*----------------- IMPORTS -----------------*/

import React, {useCallback, useEffect} from "react";
import {useFetcher, useNavigate, useRouteError, useSearchParams} from "react-router-dom";
import {ReloadIcon} from "@radix-ui/react-icons";

import {CallbackValidationError, HttpRequestError, InvalidCallbackDataError} from "@/lib/exceptions.ts";
import {useToast} from "@/components/hooks/use-toast.ts";

/*------------- ERROR HANDLING --------------*/

const handleErrorText = (error: unknown): string => {
	if (error instanceof HttpRequestError) {
		return "Não foi possível se comunicar com a API";
	} else if (error instanceof InvalidCallbackDataError){
		return "As informações de callback são inválidas";
	} else if (error instanceof CallbackValidationError ) {
		return error.message;
	}

	return "Erro desconhecido"
}

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationCallbackPage: React.FC = () => {
	const fetcher = useFetcher();
	const [searchParams] = useSearchParams();
	const { toast } = useToast()
	const routeError = useRouteError();
	const navigate = useNavigate()

	const state = searchParams.get("state")
	const code = searchParams.get("code")

	const handleCallback = useCallback(() => {
		fetcher.load(`/api/integrations/tiktok/callback?state=${state}&code=${code}`)
	}, [code, state, fetcher])

	useEffect(() => {
		if (!routeError) {
			handleCallback()
		}
	}, []);

	useEffect(() => {
		if (routeError) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: handleErrorText(routeError),
			})

			navigate("integrations/tiktok/manage", {
				replace: true
			})
		}
	}, [toast, routeError]);

	if (fetcher.state === "loading") {
		return (
			<div className="flex flex-col w-full gap-10 h-full justify-center items-center">
				<h1 className="text-3xl">Finalizando integração com o TikTok</h1>
				<ReloadIcon className="h-10 w-10 animate-spin"/>
			</div>
		);
	}
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationCallbackPage };
