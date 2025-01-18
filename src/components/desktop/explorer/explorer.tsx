/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { X } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
// import Image from "next/image";
import { useEmittor } from "emittor";
import { explorerPathEmittor } from "./emittors";
import SegoeIcon from "@/components/segoe-ui-icon";
import { ExplorerItems } from "./_components/explorer-items";
import { joinPath } from "@/lib/utils";
import { DesktopIcons, ExplorerIcons } from "@/lib/images";
import { prefetchImages } from "@/lib/preload-images";
import FolderTree, { type NavigationTreeNode } from "./navigation-pane";
import { getDataByPath, navigationData, skills } from "./data";
import ThisPC from "@/app/_components/this-pc";

function ExplorerView({
    data,
    path,
    folderNames,
}: {
    path: string;
    data: NavigationTreeNode | undefined;
    folderNames: string[];
}) {
    const emptyMessage = (
        <span className="mx-auto text-[13px]">This folder is empty.</span>
    );

    if (!data?.folders && !data?.files) return emptyMessage;
    return (
        <>
            {data && (
                <>
                    {data.folders &&
                        folderNames.map((folderN, idx) => {
                            const icon = data.folders?.[folderN]?.icon;
                            const currentPath = joinPath(path, folderN);
                            return (
                                <ExplorerItems.Large
                                    label={folderN}
                                    icon={icon ?? DesktopIcons.Folder}
                                    key={idx}
                                    data-path={currentPath}
                                    onDoubleClick={() =>
                                        explorerPathEmittor.setState(
                                            currentPath,
                                        )
                                    }
                                />
                            );
                        })}

                    {data.files?.map((fileN, idx) => (
                        <ExplorerItems.Large
                            key={idx}
                            label={fileN}
                            icon={ExplorerIcons.SimpleFile}
                        />
                    ))}
                </>
            )}
        </>
    );
}

function ExplorerPathView() {
    const [currentPath, setCurrentPath] = useEmittor(explorerPathEmittor);
    const pathParts = currentPath?.split("\\") ?? [];
    return (
        <>
            <div
                style={{ maxWidth: "calc(100% - 22rem)" }}
                className="inline-flex flex-1 snap-x snap-proximity items-center overflow-x-auto rounded-md bg-foreground/5 px-3.5 py-1 font-segoe-ui-display text-foreground/80 scrollbar-none *:snap-start"
            >
                <SegoeIcon icon="TVMonitor" />
                <SegoeIcon
                    icon="Chevron Right"
                    role="button"
                    className="ml-1.5 flex size-6 items-center justify-center rounded-md p-2 text-xs text-foreground hover:bg-foreground/5"
                />
                <div className="flex text-nowrap">
                    {pathParts.map((part, idx) => (
                        <span
                            onClick={() =>
                                explorerPathEmittor.setState(
                                    joinPath(...pathParts.slice(0, idx + 1)),
                                )
                            }
                            key={idx}
                            className="inline-flex snap-start overflow-hidden rounded-md border border-transparent hover:border-foreground/5"
                        >
                            <span className="inline-flex items-center px-2.5 hover:bg-foreground/5">
                                {part}
                            </span>
                            {idx < pathParts.length - 1 && (
                                <SegoeIcon
                                    icon="Chevron Right"
                                    className="px-1 py-1 text-xs hover:bg-foreground/5"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

export function ExplorerTitleBar({ controls }: { controls: React.ReactNode }) {
    return (
        <>
            <div
                className="w-fit cursor-default px-3 pt-2"
                onPointerDown={(e) => e.stopPropagation()}
                onDoubleClick={(e)=> e.stopPropagation()}
            >
                <div
                    data-explorer-tab
                    className="winIgnoreDrag relative inline-flex min-w-60 items-center gap-2.5 bg-foreground/5 pl-2.5 text-xs"
                >
                    <img
                        src={DesktopIcons.Explorer}
                        className="size-4"
                        alt=""
                        width={16}
                        height={16}
                    />
                    New Tab{" "}
                    <X className="m-1 ml-auto size-8 h-fit cursor-pointer rounded-lg px-2 py-1 hover:bg-foreground/10" />
                </div>
            </div>
            {controls}
            <div
                className="winIgnoreDrag col-span-2 inline-flex w-full cursor-default items-center gap-3 bg-foreground/5 px-4 py-2 text-[14px] text-foreground/80"
                onPointerDown={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
            >
                <SegoeIcon icon="Arrow Left" className="p-2" />

                <SegoeIcon icon="Arrow Right" className="p-2" />

                <SegoeIcon icon="Arrow Up" className="p-2" />

                <SegoeIcon icon="Refresh" className="p-2" />
                <ExplorerPathView />
                <span className="ml-auto inline-flex h-full min-w-44 items-center rounded-md bg-foreground/5 px-3.5 py-1.5 text-sm text-foreground/70">
                    Search This PC
                </span>
            </div>
        </>
    );
}

export function ExplorerMain() {
    const [currentPath, setCurrentPath] = useEmittor(explorerPathEmittor);
    const isThisPC = currentPath == "This PC";
    const data = isThisPC ? {} : getDataByPath(currentPath ?? "");
    const folderNames = data.folders ? Object.keys(data.folders) : [];

    useEffect(() => {
        prefetchImages([
            ...skills.map((skill) => skill.icon),
            ...Object.values(ExplorerIcons),
        ]);
    }, []);

    return (
        <>
            <div className="pointer-events-none flex select-none justify-between border-b border-foreground/10 px-5 py-3">
                <React.Fragment>
                    <img
                        src="/explorer-tools-dark.png"
                        alt="dark"
                        className="h-6 min-w-0 object-cover object-left"
                        style={{ maxWidth: "880px" }}
                    />
                    <img
                        src="/explorer-tools-dark.png"
                        alt="dark"
                        className="h-6 object-cover object-right"
                        style={{ width: "80px" }}
                    />
                </React.Fragment>
                {/* for Light Theme */}
                {/* <React.Fragment>
                    <img src="/explorer-tools-dark.png" alt="dark" className="object-cover object-left h-6" style={{maxWidth: "880px"}} />
                    <img src="/explorer-tools-dark.png" alt="dark" className="object-cover object-right h-6" style={{maxWidth: "75px"}} />
                </React.Fragment> */}
            </div>
            <ResizablePanelGroup
                className="flex-1 select-none font-segoe-ui-display"
                direction="horizontal"
                autoSaveId="explorer-sidebar-width"
            >
                {React.useMemo(
                    () => (
                        <>
                            <ResizablePanel
                                defaultSize={30}
                                collapsible
                                maxSize={40}
                                minSize={15}
                                className="gird fluent-scrollbar max-w-80 select-none !overflow-y-auto pl-4 text-sm text-foreground/90"
                            >
                                <FolderTree data={navigationData} />
                            </ResizablePanel>
                            <ResizableHandle className="w-1 bg-foreground/10 hover:bg-foreground/15" />
                        </>
                    ),
                    [],
                )}
                <ResizablePanel
                    style={{ overflow: "auto" }}
                    className="fluent-scrollbar flex max-h-full flex-wrap content-start gap-1 overflow-auto p-0.5 text-foreground/80"
                >
                    {isThisPC ? (
                        <ThisPC />
                    ) : (
                        <ExplorerView
                            folderNames={folderNames}
                            data={data}
                            path={currentPath ?? ""}
                        />
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
            <div className="flex select-none bg-foreground/2 px-4 py-0.5 text-[13px] opacity-80">
                {folderNames.length + (data.files?.length ?? 0)} items |{" "}
            </div>
        </>
    );
}

const Explorer = {
    Window: ExplorerMain,
    TitleBar: ExplorerTitleBar,
} as const;

export default Explorer;
