import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Loader, { Bar } from "./loader";

function Iframe({
    className,
    icon,
    ...p
}: React.ComponentProps<"iframe"> & { icon?: string }) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <iframe
                onLoad={() => setIsLoading(false)}
                className={cn("flex-1 bg-background", className)}
                frameBorder={0}
                {...p}
            />
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-background">
                    {icon && (
                        <img
                            src={icon}
                            className="@6xl:size-20 size-16"
                            alt="logo"
                        />
                    )}
                    {/* <Loader className="" /> */}
                    <Bar />
                </div>
            )}
        </>
    );
}

export default Iframe;
