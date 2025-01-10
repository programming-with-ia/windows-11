/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { adjustArrayLength, cn, joinPath } from "@/lib/utils";
// import Image from "next/image";
import { DesktopIcons, ExplorerIcons } from "@/lib/images";
import {
    getDataByPath,
    navigationData,
} from "@/components/desktop/explorer/data";
import { CommonPaths, explorerPathEmittor } from "@/components/desktop/explorer/emittors";
type ThisPCItemProps = {
    icon: string;
    label?: string;
} & React.ComponentProps<"button">;

import zip from "lodash/zip";

// & Omit<
// React.ComponentProps<"button">,
// "children"
// >

function ThisPCItemBase({
    icon,
    children,
    label,
    className,
    ...p
}: ThisPCItemProps) {
    return (
        <button
            className={cn(
                "inline-flex min-w-64 gap-1.5 rounded-[1px] border border-transparent px-1 py-0.5 text-[13px] outline-none focus-within:border-foreground/30 focus-within:bg-foreground/10 hover:bg-foreground/10",
                className,
            )}
            {...p}
        >
            <img
                className="aspect-square h-12 self-center object-contain"
                src={icon}
                alt={label + " icon"}
            />
            {label}
            {children}
        </button>
    );
}

function ThisPcDriveItem({
    label,
    fill,
    space,
    ...p
}: Omit<ThisPCItemProps, "childern"> & { fill: string; space: string }) {
    return (
        <ThisPCItemBase {...p}>
            <div className="flex flex-1 flex-col text-start leading-5">
                <span>{label}</span>
                <span className="h-3.5 w-full bg-[#e6e6e6] p-[1px]">
                    <span
                        className="block h-full"
                        style={{ width: fill, backgroundColor: "#26a0da" }}
                    />
                </span>
                <span className="text-foreground/60">{space}</span>
            </div>
        </ThisPCItemBase>
    );
}

function ThisPcFolderItem(props: Omit<ThisPCItemProps, "childern">) {
    return <ThisPCItemBase {...props} />;
}

const FoldersItems = [
    { icon: ExplorerIcons.FolderDesktop, label: "Desktop" },
    // { icon: ExplorerIcons.FolderDocuments, label: "Documents" },
    // { icon: ExplorerIcons.FolderDownloads, label: "Downloads" },
    { icon: ExplorerIcons.FolderMusic, label: "Music" },
    { icon: ExplorerIcons.FolderPictures, label: "Pictures" },
    { icon: ExplorerIcons.FolderVideos, label: "Videos" },
];

function ThisPC() {
    const disksData = navigationData[CommonPaths.pc]?.folders ?? {};
    const disksNames = Object.keys(disksData);
    const dirvesCustomData = zip(
        disksNames,
        adjustArrayLength<[string, string]>(
            [
                ["408.1 GB free of 988 GB", "58.7%"],
                ["498.8 GB free of 1895 GB", "73.7%"],
                ["2816.7 GB free of 3712 GB", "24.1%"],
            ],
            disksNames.length,
        ),
    );
    const userData = getDataByPath(CommonPaths.user);
    return (
        <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2", "item-3"]}
            className="w-full"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Folders</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-1">
                    {Object.keys(userData.folders ?? {})
                        .slice(0, 4) // limit
                        .map((folderName, idx) => (
                            <ThisPcFolderItem
                                key={idx}
                                label={folderName}
                                onDoubleClick={() =>
                                    explorerPathEmittor.setState(
                                        joinPath(CommonPaths.user, folderName),
                                    )
                                }
                                icon={
                                    userData.folders![folderName]?.icon ??
                                    DesktopIcons.Folder
                                }
                            />
                        ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Devices and drives</AccordionTrigger>
                <AccordionContent>
                    {dirvesCustomData
                        .filter(Boolean)
                        .map(([diskName, diskData], idx) => (
                            <ThisPcDriveItem
                                key={idx}
                                fill={diskData?.[1] ?? ""}
                                space={diskData?.[0] ?? ""}
                                label={diskName ?? ""}
                                onDoubleClick={() =>
                                    explorerPathEmittor.setState(
                                        joinPath(
                                            CommonPaths.pc,
                                            diskName ?? "",
                                        ),
                                    )
                                }
                                icon={
                                    disksData[diskName ?? ""]?.icon ??
                                    ExplorerIcons.Drive
                                }
                            />
                        ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ThisPC;
