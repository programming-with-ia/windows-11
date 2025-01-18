import { DesktopItemBase } from "./desktop-item";
import { openExplorer } from "@/components/desktop/explorer/emittors";
import { DesktopIcons } from "@/lib/images";

function ExplorerDesktopItem({
    name,
    explorerPath,
    icon = DesktopIcons.Folder,
}: {
    icon?: string;
    name: string;
    explorerPath: string;
}) {
    return (
        <DesktopItemBase
            id={`${explorerPath}-explorer-desktop-item`}
            onDoubleClick={() => openExplorer(explorerPath)}
            icon={icon}
            name={name}
        />
    );
}

export default ExplorerDesktopItem;
