/* eslint-disable @next/next/no-img-element */
import { Component } from "@/components/component";
import { DesktopIcons } from "@/lib/images";
import { cn } from "@/lib/utils";
import React from "react";
type ExplorerItemProps = {
    label: string;
    icon: string;
    isShortcut?: boolean;
    // href?: string;
} & React.ComponentProps<"button">;
export function LargeItem({
    label,
    icon,
    isShortcut,
    // href,
    className,
    ...props
}: ExplorerItemProps) {
    // const Comp = href ? Link : "button";
    console.log("explorer item");
    return (
        // <Comp
        <button
            // href={href!}
            className={cn(
                "flex h-fit w-24 select-none flex-col items-center rounded-sm border border-dotted border-transparent px-1 py-0.5 text-[13px] outline-none focus-within:bg-foreground/10 hover:bg-foreground/10 focus-visible:border-muted-foreground/80",
                className,
            )}
            // {...(props as any)}
            {...props}
        >
            <Component As={isShortcut ? "div" : 0} className="relative">
                <img
                    className="aspect-square object-contain w-24"
                    src={icon}
                    alt={label + " icon"}
                />
                {isShortcut && (
                    <img
                        className="absolute bottom-1 left-2 size-8"
                        src={DesktopIcons.Shortcut}
                        alt=""
                        width={32}
                        height={32}
                    />
                )}
            </Component>
            <span className="line-clamp-4 mt-auto">{label}</span>
        </button>
    );
}

export const ExplorerItems = {
    Large: LargeItem,
};
