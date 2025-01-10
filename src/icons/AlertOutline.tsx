import * as React from "react";
import type { SVGProps } from "react";
const AlertOutline = ({
    fill,
    size = 24,
    height,
    width,
    ...props
}: SVGProps<SVGSVGElement> & { size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? size}
        height={height ?? size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path
            fill={fill ?? "currentColor"}
            d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.25 1.25 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.25 1.25 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5M13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145zM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.004-.225A5.99 5.99 0 0 0 12 3.496"
        />
    </svg>
);
export default AlertOutline;
