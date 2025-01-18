import { DesktopItemBase } from "@/components/desktop/desktop-item";
import { useWinState } from "@/hooks/useWinState";
import { DesktopIcons } from "@/lib/images";
import dynamic from "next/dynamic";
import React from "react";
const Calculator = dynamic(() => import("@/components/calculator"));

function CalculatorItem() {
    const [isWinShow, setIsWinShow] = useWinState("calculator");
    return (
        <>
            <DesktopItemBase
                isWindowOpen={isWinShow}
                onWinClose={() => setIsWinShow(false)}
                onDoubleClick={() => setIsWinShow(true)}
                icon={DesktopIcons.Calculator}
                name="Calculator"
                isShortcut
                win={{
                    child: isWinShow ? <Calculator /> : "nothing",
                    id: "calculator",
                    className: "bg-transparent",
                    resizeAbleProps: {
                        // minWidth: "fit-content",
                        // minHeight: "fit-content",
                        // defaultSize: {
                        //     width: 260,
                        //     height: 450
                        // },
                        size: {
                            width: 260,
                            height: 450
                        }
                    },
                    wrapperClassName: "backdrop-blur-2xl bg-background/80"
                }}
                titleBar={{
                    className: "backdrop-blur-none bg-transparent",
                }}
            />
        </>
    );
}

export default CalculatorItem;
