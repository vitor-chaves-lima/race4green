import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"r4ginline-flex r4gitems-center r4gjustify-center r4gwhitespace-nowrap r4grounded-md r4gtext-sm r4gfont-medium r4gring-offset-background r4gtransition-colors focus-visible:r4goutline-none focus-visible:r4gring-2 focus-visible:r4gring-ring focus-visible:r4gring-offset-2 disabled:r4gpointer-events-none disabled:r4gopacity-50",
	{
		variants: {
			variant: {
				default:
					"r4gbg-primary r4gtext-primary-foreground hover:r4gbg-primary/90",
				destructive:
					"r4gbg-destructive r4gtext-destructive-foreground hover:r4gbg-destructive/90",
				outline:
					"r4gborder r4gborder-input r4gbg-background hover:r4gbg-accent hover:r4gtext-accent-foreground",
				secondary:
					"r4gbg-secondary r4gtext-secondary-foreground hover:r4gbg-secondary/80",
				ghost: "hover:r4gbg-accent hover:r4gtext-accent-foreground",
				link: "r4gtext-primary r4gunderline-offset-4 hover:r4gunderline",
			},
			size: {
				default: "r4gh-10 r4gpx-4 r4gpy-2",
				sm: "r4gh-9 r4grounded-md r4gpx-3",
				lg: "r4gh-11 r4grounded-md r4gpx-8",
				icon: "r4gh-10 r4gw-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
