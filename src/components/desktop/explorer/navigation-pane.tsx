/* eslint-disable @next/next/no-img-element */
"use client";
import SegoeIcon, { getSegoeIcon } from "@/components/segoe-ui-icon";
import React, { useState } from "react";
import { useEffectAfterMount } from "../../../hooks/useEffectAfterMount";
import { withDefaultProps } from "@/lib/withDefaultProps";
import { clsxLite, cn, joinPath } from "@/lib/utils";
import { DesktopIcons, ExplorerIcons } from "@/lib/images";

export type NavigationTreeNode = {
    files?: string[];
    icon?: string;
    folders?: Record<string, NavigationTreeNode>;
    initExpand?: boolean;
    onExpand?: (
        obj: Pick<NavigationTreeNode, "files" | "icon" | "folders"> & {
            name: string;
            path: string;
        },
    ) => void;
    onClick?: NavigationTreeNode["onExpand"];
};

interface FolderNodeProps {
    icon?: string;
    name: string;
    node: NavigationTreeNode;
    path: string | undefined;
    enableFiles?: boolean;
}

const NavigationItem = withDefaultProps("button", {
    className:
        "flex items-center text-nowrap py-1.5 cursor-default bleed-bg-l hocus:bleed-foreground/5",
});

const FolderNode: React.FC<FolderNodeProps> = ({
    name,
    node,
    path = "",
    enableFiles = true,
}) => {
    const [isOpen, setIsOpen] = useState(node.initExpand ?? false);
    const folderNames = Object.keys(node.folders ?? {});
    const hasContent = Boolean(
        (enableFiles && node.files?.length) || folderNames.length,
    );

    const toggleFolder = () => {
        setIsOpen((prev) => !prev);
    };

    const currentPath = joinPath(path, name);
    console.log("folderNode-render");
    useEffectAfterMount(() => {
        isOpen && node.onExpand?.({ ...node, name, path: currentPath });
    }, [isOpen]);

    return (
        <div className="grid">
            {/* Folder Name */}
            <NavigationItem
                data-path={currentPath}
                onClick={() =>
                    node.onClick?.({ ...node, name, path: currentPath })
                }
                className="explorer-nav-panel-item"
            >
                <SegoeIcon
                    className={clsxLite(
                        "pr-2 text-xs hover:opacity-70",
                        !hasContent && "pointer-events-none opacity-0",
                    )}
                    icon={isOpen ? "Chevron Down" : "Chevron Right"}
                    onClick={(e) => (e.stopPropagation(), toggleFolder())}
                />

                <img
                    src={node.icon ?? DesktopIcons.Folder}
                    alt="i"
                    className="mr-1.5 w-4"
                />
                {`${name}`}
            </NavigationItem>

            {/* Render Content Dynamically */}
            {isOpen && hasContent && (
                <div className="grid pl-2">
                    {/* Render Folders */}
                    {Boolean(folderNames.length) &&
                        folderNames.map((folderName, idx) => {
                            const treeNode = node.folders![folderName]!;
                            return (
                                <FolderNode
                                    icon=""
                                    path={currentPath}
                                    key={idx}
                                    name={folderName}
                                    node={treeNode}
                                    enableFiles={enableFiles}
                                />
                            );
                        })}

                    {/* Render Files */}
                    {enableFiles &&
                        node.files?.map((file, idx) => (
                            <NavigationItem
                                className="pl-4"
                                data-path={""}
                                key={idx}
                            >
                                📄 {file}
                            </NavigationItem>
                        ))}
                </div>
            )}
        </div>
    );
};

export type FolderTreeProps = {
    data: Record<string, NavigationTreeNode>;
    path?: string;
};

const FolderTree: React.FC<FolderTreeProps> = ({ data, path }) => {
    return (
        <>
            {Object.keys(data).map((key) => (
                <FolderNode
                    enableFiles={false}
                    path={path}
                    icon=""
                    key={key}
                    name={key}
                    node={data[key]!}
                />
            ))}
        </>
    );
};

export default FolderTree;
