import Icons from "@/font/mapped-icons";
import { cn } from "@/lib/utils";
import React from "react";
import { Component } from "./component";

function SegoeIcon<E extends React.ElementType = "span">({
    icon,
    className,
    As = "span",
    ...p
}: {
    As?: E | React.ElementType;
    icon: keyof typeof Icons;
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
        </Component>
    );
}

export default SegoeIcon;
