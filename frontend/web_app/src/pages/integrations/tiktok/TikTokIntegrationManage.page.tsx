/*----------------- IMPORTS -----------------*/

import {useFetcher} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons"

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationManagePage: React.FC = () => {
	const fetcher = useFetcher();

	const handleIntegrateButtonClick = () => {
		fetcher.submit(null, {
			method: "POST",
			action: "/integrations/tiktok/authorize",
		});
	};

	return (
		<div className="flex flex-col h-full gap-6">
			<Button variant={"default"} onClick={handleIntegrateButtonClick} disabled={fetcher.state === "submitting"}>
				{fetcher.state === "submitting" && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
				Integrar
			</Button>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationManagePage };
