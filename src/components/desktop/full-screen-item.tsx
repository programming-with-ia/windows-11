"use client";
import DesktopItem from "@/components/desktop/desktop-item";
import { DesktopIcons } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { CompoProps } from "@/types/types";
import React, { useEffect, useState } from "react";

function FullScreenBtn({
    className,
}: Pick<CompoProps<typeof DesktopItem>, "className">) {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (!isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document
                .exitFullscreen()
                .catch((...e) =>
                    console.error("Error When exiting on full screen mode", e),
                );
        }
    };

    // Function to check if the user is in fullscreen mode
    useEffect(() => {
        const checkFullScreen = () => {
            const tolerance = 6;
            setIsFullScreen(
                Math.abs(window.innerHeight - screen.height) <= tolerance,
            );
        };
        const onFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement != null);
        };
        window.addEventListener("resize", checkFullScreen);
        document.addEventListener("fullscreenchange", onFullScreenChange);

        // Initial check if already in full-screen mode
        checkFullScreen();

        return () => {
            window.removeEventListener("resize", checkFullScreen);
            document.removeEventListener(
                "fullscreenchange",
                onFullScreenChange,
            );
        };
    }, []);
    console.log(isFullScreen);
    return (
        <>
            <DesktopItem
                key={isFullScreen ? 1 : 0}
                icon={
                    isFullScreen
                        ? DesktopIcons.ExitFullScreen
                        : DesktopIcons.FullScreen
                }
                name={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                isShortcut
                smallIcon
                className={cn("gap-2", className)}
                onDoubleClick={handleFullScreen}
            />
        </>
    );
}

export default FullScreenBtn;
