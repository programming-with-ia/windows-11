import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
    Primitive,
    type PrimitivePropsWithRef,
} from "@radix-ui/react-primitive";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);
export const BadgeBtnVariants = cva(
    "inline-flex cursor-default justify-between gap-1 rounded-md text-xs font-normal border border-foreground/5",
    {
        variants: {
            variant: {
                primary: "bg-primary hocus:bg-primary-hover",
                secondary: "bg-foreground/10 hocus:bg-foreground/15",
                secondaryLite: "bg-foreground/5 hocus:bg-foreground/10",
                ghost: "hocus:bg-foreground/10",
                ghostLite: "hocus:bg-foreground/5",
            },
            size: {
                default: "px-2 py-1",
                icon: "py-1 px-1.5",
            },
        },
        defaultVariants: {
            variant: "secondary",
            size: "default",
        },
    },
);

type ButtonProps = PrimitivePropsWithRef<"button"> &
    VariantProps<typeof buttonVariants>;
Primitive.button;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            // @ts-ignore
            <Primitive.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
