/*----------------- IMPORTS -----------------*/

import React, { Suspense, useCallback, useEffect } from "react";

import {
	Await,
	Link,
	useAsyncError,
	useFetcher,
	useLoaderData,
	useLocation,
	useNavigate,
	useRouteError,
} from "react-router-dom";

import {
	TikTokLoaderReturn,
	TikTokVideo,
} from "@/loaders/tikTokIntegration.loaders.ts";
import { Button } from "@/components/ui/button.tsx";
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
import { ReloadIcon } from "@radix-ui/react-icons";

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
		navigate("/dashboard/integrations", {
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
		navigate("dashboard/integrations", {
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

const TikTokVideoCard = ({ title, cover_image_url }: TikTokVideo) => {
	return (
		<div className="relative">
			<h3 className="absolute bottom-0 backdrop-blur-3xl px-2 text-lg font-bold">
				{title}
			</h3>

			<img src={cover_image_url} alt={`${title} cover image`} />
		</div>
	);
};

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
						disabled={fetcher.state === "submitting"}
					>
						Desconectar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const TikTokIntegrationManageConnectedContent = ({
	videos,
}: {
	videos: TikTokLoaderReturn["videos"];
}) => {
	const fetcher = useFetcher();

	const handledSyncButtonClick = () => {
		fetcher.submit(null, {
			method: "POST",
			action: "/api/integrations/tiktok/sync",
		});
	};

	return (
		<div className="flex flex-col w-full h-full gap-6">
			<div className="border-b border-b-foreground flex flex-row items-center justify-end p-5 gap-4">
				<Suspense>
					<Await resolve={videos}>
						{(resolvedVideos) => {
							if (resolvedVideos.length > 0) {
								return (
									<Button
										variant="default"
										className="rounded"
										onClick={handledSyncButtonClick}
										disabled={
											fetcher.state === "submitting"
										}
									>
										{fetcher.state === "submitting" && (
											<ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
										)}
										Sicronizar
									</Button>
								);
							}
						}}
					</Await>
				</Suspense>

				<TikTokIntegrationDisconnect />
			</div>

			<div className="flex-1 flex flex-col items-center justify-center gap-8">
				<Suspense
					fallback={
						<>
							<p className="text-2xl">Carregando vídeos</p>
							<ReloadIcon className="mr-2 h-8 w-8 animate-spin" />
						</>
					}
				>
					<Await
						resolve={videos}
						errorElement={
							<TikTokIntegrationManageLoaderErrorElement />
						}
						children={(resolvedVideos: TikTokVideo[]) => {
							if (resolvedVideos.length === 0) {
								return (
									<div className="text-center">
										<div className="flex flex-col w-full items-center justify-center gap-3 mb-10">
											<h1 className="text-3xl font-bold">
												Não encontramos nenhum vídeo
											</h1>
											<h2 className="text-2xl font-light">
												Siga os passos ao publicar um
												novo vídeo e depois clique em
												sincronizar
											</h2>
										</div>

										<div className="mb-3">
											<Link
												to={
													"/integrations/tiktok/about"
												}
											>
												<Button
													variant="link"
													className="w-full text-lg text-foreground"
												>
													Saiba Mais
												</Button>
											</Link>
										</div>

										<Button
											variant="default"
											className="text-xl py-7 px-10 rounded"
											name="intent"
											value="connect"
											onClick={handledSyncButtonClick}
											disabled={
												fetcher.state === "submitting"
											}
										>
											{fetcher.state === "submitting" && (
												<ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
											)}
											Sincronizar
										</Button>
									</div>
								);
							}

							return (
								<div className="grid grid-cols-3 gap-7">
									{resolvedVideos.map((v) => (
										<TikTokVideoCard {...v} />
									))}
								</div>
							);
						}}
					></Await>
				</Suspense>
			</div>
		</div>
	);
};

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationManagePage: React.FC = () => {
	const { status, videos } = useLoaderData() as TikTokLoaderReturn;
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
					else
						return (
							<TikTokIntegrationManageConnectedContent
								videos={videos}
							/>
						);
				}}
			></Await>
		</Suspense>
	);
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationManagePage, TikTokIntegrationManageErrorElement };
