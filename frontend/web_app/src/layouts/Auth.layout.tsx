/*----------------- IMPORTS -----------------*/

import React from "react";

import { Outlet } from "react-router-dom";

/*---------------- COMPONENT ----------------*/

const AuthLayout: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<div className="border-b h-full">
				<div className="flex flex-col gap-7 p-4 justify-between">
					<a href="/" className="font-bold text-2xl">
						<span className="pl-4">Race 4 Green</span>
					</a>
				</div>
			</div>

			<main className="flex h-full flex-1 flex-col p-4 lg:p-6 items-center justify-center">
				<Outlet />
			</main>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { AuthLayout };
