import Icons from "@/font/mapped-icons";
import { cn } from "@/lib/utils";
import React from "react";
import { Component } from "./component";

export type SegoeIconsType = keyof typeof Icons

function SegoeIcon<E extends React.ElementType = "span">({
    icon,
    className,
    As = "span",
    children,
    ...p
}: {
    As?: E | React.ElementType | 0;
    icon: SegoeIconsType;
    className?: string;
} & React.ComponentPropsWithoutRef<E>) {
    return (
        <Component
            As={As}
            className={cn(
                "inline-flex cursor-default select-none items-center justify-center font-segoe-icon",
                className,
            )}
            {...p}
        >
            {Icons[icon]}
            {children}
        </Component>
    );
}

export const getSegoeIcon = (icon: SegoeIconsType) => Icons[icon]

export default SegoeIcon;
