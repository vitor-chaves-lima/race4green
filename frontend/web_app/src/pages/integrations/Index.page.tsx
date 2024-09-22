/*----------------- IMPORTS -----------------*/

import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import TikTokLogo from "@/assets/logos/tiktok.svg";
import { useToast } from "@/components/hooks/use-toast.ts";

/*--------------- INTERFACES ----------------*/

interface IntegrationListCardProps {
	logo: string;
	platformName: string;
	description: string;
	aboutPath: string;
}

/*-------------- SUBCOMPONENTS --------------*/

const IntegrationListPlatformCard: React.FC<IntegrationListCardProps> = ({
	logo,
	platformName,
	description,
	aboutPath,
}: IntegrationListCardProps) => {
	return (
		<div className="w-full h-full border-2 rounded-2xl flex flex-col items-center justify-center gap-10 px-10 py-8">
			<img src={logo} className="h-24 w-24" alt="TikTok Logo" />

			<div className="flex flex-col items-center gap-7">
				<div className="flex flex-col items-center">
					<h1 className="text-2xl font-bold">{platformName}</h1>
					<p className="text-lg font-light">{description}</p>
				</div>

				<div className="flex flex-col w-full gap-2">
					<Link to={aboutPath}>
						<Button
							variant="link"
							className="w-full text-lg text-foreground"
						>
							Saiba Mais
						</Button>
					</Link>

					<Link to={"/integrations/tiktok/manage"}>
						<Button
							variant="secondary"
							className="w-full text-lg rounded-xl"
						>
							Gerenciar
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

/*---------------- COMPONENT ----------------*/

const IntegrationsIndexPage: React.FC = () => {
	const location = useLocation();

	const { toast } = useToast();

	useEffect(() => {
		const toastData = location.state?.toastData;

		if (toastData) {
			toast({ ...toastData });
		}
	}, [location, toast]);

	return (
		<div className="flex flex-col h-full w-full items-center justify-center gap-16">
			<div className="flex flex-col w-full items-center justify-center gap-3">
				<h1 className="text-3xl font-bold">
					Conecte e gerencie suas contas
				</h1>
				<h2 className="text-2xl font-light">
					Integre com diferentes plataformas para ganhar pontos na
					Race 4 Green
				</h2>
			</div>

			<div className="grid w-4/6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-[1fr] auto-rows-auto gap-5 justify-items-center items-center">
				<IntegrationListPlatformCard
					logo={TikTokLogo}
					platformName="Tik Tok"
					description="Plataforma de vídeos curtos"
					aboutPath="/integrations/tiktok/about"
				/>
			</div>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { IntegrationsIndexPage };
