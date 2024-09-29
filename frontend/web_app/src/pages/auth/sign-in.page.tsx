/*----------------- IMPORTS -----------------*/

import React, { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { useFetcher } from "react-router-dom";

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
		<div className="grid grid-cols-2 h-full w-full gap-8">
			<div></div>

			<form
				className="flex flex-col w-full gap-16"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-8">
					<Input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<Input
						type="password"
						placeholder="Senha"
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
				</div>

				<Button type="submit" disabled={fetcher.state === "submitting"}>
					Login
				</Button>
			</form>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { SignInPage };
