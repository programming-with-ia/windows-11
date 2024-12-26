import { DesktopItemBase } from "@/components/desktop/desktop-item";
import { useWinState } from "@/hooks/useWinState";
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
                icon="/icons/calculator.png"
                name="Calculator"
                isShortcut
                win={{
                    child: isWinShow ? <Calculator /> : "nothing",
                    id: "calculator",
                    className: "backdrop-blur-2xl bg-background/80",
                    resizeAbleProps: { minWidth: 270, minHeight: 415 },
                }}
            />
        </>
    );
}

export default CalculatorItem;
