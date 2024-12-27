import { DesktopItemBase } from "@/components/desktop/desktop-item";
import React, { useState } from "react";
// import Explorer from './explorer';
import dynamic from "next/dynamic";
import { useWinState } from "@/hooks/useWinState";
import { DesktopIcons } from "@/lib/images";
const ExplorerWindow = dynamic(() =>
    import("./explorer").then((a) => a.ExplorerMain),
);
const ExplorerTitleBar = dynamic(() =>
    import("./explorer").then((a) => a.ExplorerTitleBar),
);

function ExplorerItem() {
    const winId = "file-explorer";
    const [isWinShow, setIsWinShow] = useWinState(winId);
    return (
        <>
            <DesktopItemBase
                isWindowOpen={isWinShow}
                onWinClose={() => setIsWinShow(false)}
                onDoubleClick={() => setIsWinShow(true)}
                smallIcon
                className="gap-1.5"
                icon={DesktopIcons.Explorer}
                name="File Explorer"
                id="explorer-desktop-item"
                {...(isWinShow
                    ? {
                          win: {
                              className: "flex flex-col",
                              child: <ExplorerWindow />,
                              id: winId,
                              resizeAbleProps: {
                                  defaultSize: {
                                      width: "75vw",
                                      height: "600px",
                                  },
                              },
                          },
                          titleBar: {
                              className:
                                  "bg-background/90 grid grid-cols-[1fr_auto]",
                              getTitleBarChild: ExplorerTitleBar,
                          },
                      }
                    : {})}
            />
        </>
    );
}

export default ExplorerItem;
