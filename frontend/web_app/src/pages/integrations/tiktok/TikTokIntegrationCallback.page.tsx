/*----------------- IMPORTS -----------------*/

import React, { useCallback, useEffect } from "react";

import {
	Await,
	useAsyncError,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
	CallbackTikTokError,
	CallbackValidationError,
	HttpRequestError,
	InvalidCallbackDataError,
} from "@/lib/exceptions.ts";
import { TikTokCallbackLoaderReturn } from "@/loaders/tikTokIntegration.loaders.ts";

/*-------------- SUBCOMPONENTS --------------*/

const TikTokIntegrationCallbackErrorElement: React.FC = () => {
	const error = useAsyncError();
	const navigate = useNavigate();

	const getErrorText = useCallback(() => {
		if (error instanceof HttpRequestError) {
			return "Não foi possível se comunicar com a API";
		} else if (error instanceof CallbackTikTokError) {
			return (
				error.message ||
				"Um erro aconteceu no lado do TikTok, tente fazer a integração novamente após alguns minutos!"
			);
		} else if (error instanceof InvalidCallbackDataError) {
			return "As informações de callback são inválidas";
		} else if (error instanceof CallbackValidationError) {
			return error.message;
		}

		return "Erro desconhecido";
	}, [error]);

	useEffect(() => {
		navigate("/dashboard/integrations/tiktok/manage", {
			replace: true,
			state: {
				toastData: {
					variant: "destructive",
					title: "Erro",
					description: getErrorText(),
				},
			},
		});
	}, [navigate, getErrorText]);

	return <></>;
};

const TikTokIntegrationCallbackSuccessElement = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/dashboard/integrations/tiktok/manage", {
			replace: true,
			state: {
				toastData: {
					variant: "success",
					title: "Sucesso",
					description: "A integração com o TikTok foi concluída",
				},
			},
		});
	}, [navigate]);

	return <></>;
};

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationCallbackPage: React.FC = () => {
	const loaderData = useLoaderData() as TikTokCallbackLoaderReturn;

	return (
		<React.Suspense
			fallback={
				<div className="flex flex-col w-full gap-10 h-full justify-center items-center">
					<h1 className="text-3xl">
						Concluindo integração com o TikTok
					</h1>
					<ReloadIcon className="h-10 w-10 animate-spin" />
				</div>
			}
		>
			<Await
				resolve={loaderData.data}
				errorElement={<TikTokIntegrationCallbackErrorElement />}
			>
				<TikTokIntegrationCallbackSuccessElement />
			</Await>
		</React.Suspense>
	);
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationCallbackPage };
