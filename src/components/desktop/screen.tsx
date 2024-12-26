import { cn } from "@/lib/utils";
import React from "react";

function Screen({ children, className, ...p }: React.ComponentProps<"main">) {
    return (
        <main
            id="screen"
            className={cn(
                "flex h-screen w-screen flex-col overflow-hidden",
                className,
            )}
        >
            {children}
        </main>
    );
}

export default Screen;
