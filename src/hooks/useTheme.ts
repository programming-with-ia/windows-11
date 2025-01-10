"use client";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

// export const Theme = {
//     theme: "dark",
//     setTheme: (() => null) as React.Dispatch<React.SetStateAction<string>>,
// };

export function ThemeHelper() {
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        window.nextTheme = {
            theme: resolvedTheme ?? "dark",
            setTheme: setTheme,
        };
    }, [resolvedTheme, setTheme]);
    return null;
}
