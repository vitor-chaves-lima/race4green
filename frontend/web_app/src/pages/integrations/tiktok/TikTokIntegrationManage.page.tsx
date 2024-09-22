/*----------------- IMPORTS -----------------*/

import React, { useEffect } from "react";

import { useFetcher, useLoaderData, useRouteError } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

import { HttpRequestError } from "@/lib/exceptions.ts";

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
import { Button } from "@/components/ui/button";

import { TikTokStatusLoaderReturn } from "@/loaders/tikTokIntegration.loaders.ts";
import { useToast } from "@/components/hooks/use-toast.ts";

/*------------- ERROR HANDLING --------------*/

const handleErrorText = (error: unknown): string => {
	if (error instanceof HttpRequestError) {
		return "Não foi possível se comunicar com a API";
	}

	return "Erro desconhecido";
};

/*-------------- SUBCOMPONENTS --------------*/

const TikTokIntegrationManageNotConnectedContent = () => {
	const { toast } = useToast();
	const fetcher = useFetcher();
	const routeError = useRouteError();

	useEffect(() => {
		if (routeError) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: handleErrorText(routeError),
			});
		}
	}, [toast, routeError]);

	useEffect(() => {
		toast({
			variant: "success",
			title: "Sucesso",
			description: "A integração com o TikTok foi concluída",
		});
	}, [toast]);

	const handleIntegrateButtonClick = () => {
		fetcher.submit(null, {
			method: "POST",
			action: "/api/integrations/tiktok/authorize",
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
				variant={"default"}
				onClick={handleIntegrateButtonClick}
				className="text-xl py-7 px-10 rounded"
				disabled={fetcher.state === "submitting"}
			>
				{fetcher.state === "submitting" && (
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				)}
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
						{fetcher.state === "submitting" && (
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
						)}
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

	if (status === "notConnected")
		return <TikTokIntegrationManageNotConnectedContent />;
	else return <TikTokIntegrationManageConnectedContent />;
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationManagePage };
