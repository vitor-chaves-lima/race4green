/*----------------- IMPORTS -----------------*/

import React, { FormEvent, useState } from "react";

import FormulaECarImage from "@/assets/images/formula-e-car.png";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFetcher } from "react-router-dom";
import { validateEmail } from "@/lib/regex.ts";

/*---------------- COMPONENT ----------------*/

const SignInPage: React.FC = () => {
	const fetcher = useFetcher();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetcher.submit(
			{
				email,
				password,
			},
			{
				method: "POST",
				action: "/api/iam/sign-in",
				encType: "application/json",
			},
		);
	};

	return (
		<div className="grid lg:grid-cols-2 grid-cols-1 h-full w-full gap-8">
			<div className="justify-center items-center hidden lg:flex">
				<img src={FormulaECarImage} alt="Carro Fórmula E" />
			</div>

			<div className="flex flex-col gap-16 items-center justify-center">
				<form
					className="flex flex-col w-full lg:min-w-80 lg:max-w-96 gap-14 border-white border p-14 py-24 lg:box-content rounded-2xl"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-col items-center gap-3">
						<h1 className="text-2xl font-bold">
							Bem-vindo de volta!
						</h1>

						<h2 className="text-xl">Pronto para continuar?</h2>
					</div>

					<div className="flex flex-col gap-8">
						<Input
							type="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.currentTarget.value)}
							className="text-xl py-6 px-5 rounded border-white text-white"
							disabled={fetcher.state === "submitting"}
						/>
						<Input
							type="password"
							placeholder="Senha"
							onChange={(e) => setPassword(e.currentTarget.value)}
							className="text-xl py-6 px-5 rounded border-white text-white"
							disabled={fetcher.state === "submitting"}
						/>
					</div>

					<Button
						type="submit"
						disabled={
							fetcher.state === "submitting" ||
							!validateEmail(email) ||
							password.length < 8
						}
						className="text-xl py-6 px-5 rounded"
					>
						{fetcher.state === "submitting" && (
							<ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
						)}
						Entrar
					</Button>
				</form>
			</div>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { SignInPage };
