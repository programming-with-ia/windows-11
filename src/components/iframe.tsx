import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Loader from "./loader";

function Iframe({ className, ...p }: React.ComponentProps<"iframe">) {
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
                <>
                    <Loader className="absolute bottom-0 right-0 m-2" />
                </>
            )}
        </>
    );
}

export default Iframe;
