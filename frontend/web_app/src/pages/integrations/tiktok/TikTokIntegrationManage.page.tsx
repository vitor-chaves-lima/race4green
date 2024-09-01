/*----------------- IMPORTS -----------------*/

import { Button } from "@/components/ui/button";
import { useSubmit } from "react-router-dom";

/*---------------- COMPONENT ----------------*/

const TikTokIntegrationManagePage: React.FC = () => {
	const submit = useSubmit();

	const handleIntegrateButtonClick = () => {
		submit(null, {
			method: "POST",
			action: "/integrations/tiktok/authorize",
		});
	};

	return (
		<div className="flex flex-col h-full gap-6">
			<Button variant={"default"} onClick={handleIntegrateButtonClick}>
				Integrar
			</Button>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { TikTokIntegrationManagePage };
