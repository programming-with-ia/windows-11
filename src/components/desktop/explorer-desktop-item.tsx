import React, { useEffect } from "react";
import { DesktopItemBase } from "./desktop-item";
import { explorerTabEmittor } from "@/components/desktop/explorer/emittors";
import type { explorerTabsType } from "@/components/desktop/explorer/explorer";
import { doubleClick } from "@/lib/utils";

function ExplorerDesktopItem({
    name,
    explorerTab,
    icon = "/icons/folder.png",
}: {
    icon?: string;
    name: string;
    explorerTab: explorerTabsType;
}) {
    return (
        <DesktopItemBase
            id={`${explorerTab}-explorer-desktop-item`}
            onDoubleClick={() => {
                explorerTabEmittor.setState(explorerTab);
                doubleClick("explorer-desktop-item");
            }}
            icon={icon}
            name={name}
        />
    );
}

export default ExplorerDesktopItem;
