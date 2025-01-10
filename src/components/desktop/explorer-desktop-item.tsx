import { DesktopItemBase } from "./desktop-item";
import { openExplorer } from "@/components/desktop/explorer/emittors";
import type { explorerTabsType } from "@/components/desktop/explorer/explorer";
import { DesktopIcons } from "@/lib/images";

function ExplorerDesktopItem({
    name,
    explorerTab,
    icon = DesktopIcons.Folder,
}: {
    icon?: string;
    name: string;
    explorerTab: explorerTabsType;
}) {
    return (
        <DesktopItemBase
            id={`${explorerTab}-explorer-desktop-item`}
            onDoubleClick={() => openExplorer(explorerTab)}
            icon={icon}
            name={name}
        />
    );
}

export default ExplorerDesktopItem;
