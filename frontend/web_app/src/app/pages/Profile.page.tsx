/*----------------- IMPORTS -----------------*/

import React, { Suspense } from "react";

import { Await, useLoaderData } from "react-router-dom";

import { ReloadIcon } from "@radix-ui/react-icons";

import { UserData } from "@/app/loaders/auth.loaders.ts";

import { Progress } from "@/app/components/ui/progress";

/*-------------- SUBCOMPONENTS --------------*/

const ProfilePageError = () => {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-8">
			<h2 className="text-2xl">Algo deu errado!</h2>
		</div>
	);
};

const ProfilePageLoading = () => {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-8">
			<p className="text-2xl">Carregando perfil</p>
			<ReloadIcon className="mr-2 h-8 w-8 animate-spin" />
		</div>
	);
};

const ProfilePageContent = (_: UserData) => {
	return (
		<div className="flex flex-col w-full h-full gap-6">
			<div className="border-b border-b-foreground flex flex-row items-center p-5 gap-4">
				<div className="flex flex-col gap-4">
					<h3>Experiência do personagem</h3>
					<Progress value={3} />
				</div>
			</div>
			<div className="flex flex-col w-full h-full gap-16 items-center justify-center">
				<div className="flex flex-col w-full items-center justify-center gap-3">
					<h1 className="text-3xl font-bold">
						Você ainda não ganhou nenhum ponto
					</h1>
					<h2 className="text-2xl font-light">
						Verifique a página de integrações
					</h2>
				</div>
			</div>
		</div>
	);
};

/*---------------- COMPONENT ----------------*/

const ProfilePage: React.FC = () => {
	const userData = useLoaderData() as { userData: Promise<UserData> };

	return (
		<Suspense fallback={<ProfilePageLoading />}>
			<Await
				resolve={userData["userData"]}
				children={(resolvedUserData) => (
					<ProfilePageContent {...resolvedUserData} />
				)}
				errorElement={<ProfilePageError />}
			/>
		</Suspense>
	);
};

/*----------------- EXPORTS -----------------*/

export { ProfilePage };
