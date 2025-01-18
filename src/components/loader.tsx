import { cn } from "@/lib/utils";
import React from "react";

function Loader({ className }: React.ComponentProps<"svg">) {
    return (
        <svg
            className={cn("container", className)}
            viewBox="0 0 40 40"
            height="40"
            width="40"
        >
            <circle
                className="track"
                cx="20"
                cy="20"
                r="17.5"
                pathLength="100"
                strokeWidth="3px"
                fill="none"
            />
            <circle
                className="car"
                cx="20"
                cy="20"
                r="17.5"
                pathLength="100"
                strokeWidth="5px"
                fill="none"
            />
        </svg>
    );
}

export function Bar() {
    return (
        <div className="loader-bar">
            <style jsx>
                {`
                    /* css */
                    .loader-bar {
                        --uib-size: 100px;
                        --uib-color: hsl(var(--primary));
                        --uib-speed: 1.75s;
                        --uib-stroke: 4px;
                        --uib-bg-opacity: 0.1;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: var(--uib-stroke);
                        width: var(--uib-size);
                        border-radius: calc(var(--uib-stroke) / 2);
                        overflow: hidden;
                        transform: translate3d(0, 0, 0);
                    }

                    .loader-bar::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background-color: var(--uib-color);
                        opacity: var(--uib-bg-opacity);
                        transition: background-color 0.3s ease;
                    }

                    .loader-bar::after {
                        content: "";
                        height: 100%;
                        width: 100%;
                        border-radius: calc(var(--uib-stroke) / 2);
                        animation: wobble var(--uib-speed) ease-in-out infinite;
                        transform: translateX(-95%);
                        background-color: var(--uib-color);
                        transition: background-color 0.3s ease;
                    }

                    @keyframes wobble {
                        0%,
                        100% {
                            transform: translateX(-95%);
                        }
                        50% {
                            transform: translateX(95%);
                        }
                    }

                    /* !css */
                `}
            </style>
        </div>
    );
}

export default Loader;
