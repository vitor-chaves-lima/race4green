/*----------------- IMPORTS -----------------*/

import React from "react";

/*---------------- COMPONENT ----------------*/

const ProfilePage: React.FC = () => {
	return (
		<div className="flex flex-col h-full w-full items-center justify-center gap-16">
			<div className="flex flex-col w-full items-center justify-center gap-3">
				<h1 className="text-3xl font-bold">
					Esta página ainda está em construção
				</h1>
				<h2 className="text-2xl font-light">
					Integre com diferentes plataformas para ganhar pontos na
					Race 4 Green
				</h2>
			</div>

			<div className="grid w-4/6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-[1fr] auto-rows-auto gap-5 justify-items-center items-center"></div>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { ProfilePage };
