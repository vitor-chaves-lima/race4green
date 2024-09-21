/*----------------- IMPORTS -----------------*/

import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/*--------------- INTERFACES ----------------*/

interface IntegrationLayoutCardProps {
	title: string;
	backButtonPath: string;
	subRouteTitles: Map<string, string>;
}

/*---------------- COMPONENT ----------------*/

const IntegrationLayout: React.FC<IntegrationLayoutCardProps> = ({
	title,
	backButtonPath,
	subRouteTitles = new Map(),
}: IntegrationLayoutCardProps) => {
	const location = useLocation();
	const subRouteTitle = subRouteTitles.get(location.pathname);

	return (
		<div className="flex flex-col h-full w-full gap-6">
			<div className="flex w-full items-center gap-3 py-4">
				<Link to={backButtonPath}>
					<Button variant={"ghost"} className="rounded-full py-6">
						<ArrowLeft size={24} />
					</Button>
				</Link>
				<h2 className="text-2xl">
					{title} {subRouteTitle ? `- ${subRouteTitle}` : ""}
				</h2>
			</div>

			<section className="flex flex-1">
				<Outlet />
			</section>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { IntegrationLayout };
