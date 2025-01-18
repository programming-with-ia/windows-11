"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CVAConfigSchema } from "@/types/types";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className,
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// const dialogVariantsObj:CVAVariants = {

// }

export const dialogVariantsObj = {
    side: {
        top: "top-0",
        bottom: "bottom-0",
        // left: "left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        // right:
        //   "right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        center: "top-[50%] translate-y-[-50%]",
    },
    align: {
        left: "left-0",
        right: "right-0",
        center: "left-[50%] translate-x-[-50%] data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2",
    },
    from: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        // center: "data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2",
    },
    mica: {
        true: "acrylic-noise elevation-5 dark:backdrop-brightness-75 backdrop-blur-2xl rounded-lg bg-secondary/80 dark:bg-secondary/50 border border-foreground/5",
        false: null,
    },
} as const satisfies CVAConfigSchema;

export const dialogVariants = cva(
    [
        "z-50 fixed grid w-full ease-linear !duration-150 outline-none select-none cursor-default text-foreground p-6",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:invisible",
    ],
    {
        variants: dialogVariantsObj,
        defaultVariants: {
            mica: true,
            side: "bottom",
            align: "center",
            from: "bottom",
        },
    },
);

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
        VariantProps<typeof dialogVariants>
>(({ className, side, align, from, mica, children, ...props }, ref) => (
    <DialogPortal>
        {/* <DialogOverlay /> */}
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                // "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out sm:rounded-lg", // data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
                dialogVariants({ side, align, from, mica }),
                className,
            )}
            {...props}
        >
            {children}
            {/* <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close> */}
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className,
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className,
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
