/*----------------- IMPORTS -----------------*/

import React, { Suspense, useCallback, useEffect } from "react";

import {
	Await,
	useAsyncError,
	useFetcher,
	useLoaderData,
	useLocation,
	useNavigate,
	useRouteError,
} from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { TikTokStatusLoaderReturn } from "@/loaders/tikTokIntegration.loaders.ts";
import { useToast } from "@/components/hooks/use-toast.ts";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";

import { HttpRequestError, IntegrationInitError } from "@/lib/exceptions.ts";

/*------------- ERROR HANDLING --------------*/

const TikTokIntegrationManageErrorElement = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	const getErrorText = useCallback(() => {
		if (error instanceof HttpRequestError) {
			return "Não foi possível se comunicar com a API";
		} else if (error instanceof IntegrationInitError) {
			return error.message;
		}

		return "Erro desconhecido";
	}, [error]);

	useEffect(() => {
		navigate("/integrations/tiktok/manage", {
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

const TikTokIntegrationManageLoaderErrorElement = () => {
	const error = useAsyncError();
	const navigate = useNavigate();

	const getErrorText = useCallback(() => {
		if (error instanceof HttpRequestError) {
			return "Não foi possível se comunicar com a API";
		} else if (error instanceof IntegrationInitError) {
			return error.message;
		}

		return "Erro desconhecido";
	}, [error]);

	useEffect(() => {
		navigate("/integrations", {
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

/*-------------- SUBCOMPONENTS --------------*/

const TikTokIntegrationManageNotConnectedContent = () => {
	const fetcher = useFetcher();

	const handleIntegrationInit = () => {
		fetcher.submit(null, {
			method: "post",
			action: "/api/integrations/tiktok/init",
		});
	};

	return (
		<div className="flex flex-col w-full h-full gap-16 items-center justify-center">
			<div className="flex flex-col w-full items-center justify-center gap-3">
				<h1 className="text-3xl font-bold">
					Você ainda não adicionou sua conta do TikTok
				</h1>
				<h2 className="text-2xl font-light">
					Clique no botão abaixo para fazer isso!
				</h2>
			</div>

			<Button
				variant="default"
				className="text-xl py-7 px-10 rounded"
				name="intent"
				value="connect"
				onClick={handleIntegrationInit}
			>
				Conectar
			</Button>
		</div>
	);
};

const TikTokIntegrationDisconnect = () => {
	const fetcher = useFetcher();

	const handledDisconnectButtonClick = () => {
		fetcher.submit(null, {
			method: "POST",
			action: "/api/integrations/tiktok/disconnect",
		});
	};

	return (
		<Dialog modal>
			<DialogTrigger asChild>
				<Button variant={"destructive"} className="rounded">
					Desconectar
				</Button>
			</DialogTrigger>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
			>
				<DialogHeader>
					<DialogTitle>Desconectar?</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-md my-3 text-foreground">
					Após cancelar a integração com o TikTok não será possível
					continuar acumulando pontos. Você deseja continuar?
				</DialogDescription>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary" className="rounded">
							Cancelar
						</Button>
					</DialogClose>

					<Button
						variant="destructive"
						className="rounded"
						onClick={handledDisconnectButtonClick}
					>
						Desconectar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const TikTokIntegrationManageConnectedContent = () => {
	return (
		<div className="flex flex-col w-full h-full gap-6">
			<div className="border-b border-b-foreground flex flex-row items-center justify-between p-5">
				<h1 className="text-xl">Total de pontos na plataforma: 10</h1>

				<TikTokIntegrationDisconnect />
			</div>

			<div className="flex-1 flex flex-col items-center justify-center gap-8">
				{/*<p className="text-2xl">Carregando vídeos</p>*/}
				{/*<ReloadIcon className="mr-2 h-8 w-8 animate-spin" />*/}
			</div>
		</div>
	);
};

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationManagePage: React.FC = () => {
	const { status } = useLoaderData() as TikTokStatusLoaderReturn;
	const location = useLocation();

	const { toast } = useToast();

	useEffect(() => {
		const toastData = location.state?.toastData;

		if (toastData) {
			toast({ ...toastData });
		}
	}, [location, toast]);

	return (
		<Suspense>
			<Await
				resolve={status}
				errorElement={<TikTokIntegrationManageLoaderErrorElement />}
				children={(resolvedStatus) => {
					if (resolvedStatus === "notConnected")
						return <TikTokIntegrationManageNotConnectedContent />;
					else return <TikTokIntegrationManageConnectedContent />;
				}}
			></Await>
		</Suspense>
	);
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationManagePage, TikTokIntegrationManageErrorElement };
