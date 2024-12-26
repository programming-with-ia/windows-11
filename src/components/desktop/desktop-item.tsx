"use client";
import { clsx, cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { type DraggableWindowProps } from "../drag-window";
import dynamic from "next/dynamic";
import { useWinState } from "@/hooks/useWinState";
import { DesktopItemContextMenuEmittor } from "@/lib/emittors";
const DraggableWindowBase = dynamic(() =>
    import("../drag-window").then((all) => all.DraggableWindowBase),
);

type DesktopItemProps = React.ComponentProps<"button"> & {
    icon: string;
    smallIcon?: boolean;
    name: string;
    isShortcut?: boolean;
    isWindowOpen?: boolean;
    win?: {
        child: React.ReactNode;
    } & Pick<
        DraggableWindowProps,
        "image" | "wrapperClassName" | "className" | "id" | "resizeAbleProps"
    >;
    titleBar?: DraggableWindowProps["titlebar"];
    taskBarItem?: DraggableWindowProps["taskBarItem"];
    onWinClose?: DraggableWindowProps["onClose"];
};

export const taskbarBtnClick = (winId: string | undefined) => {
    if (!winId) return;

    const taskbarbtn = document.querySelector<HTMLButtonElement>(
        `[data-win-for="${winId}"]`,
    );
    if (taskbarbtn) {
        taskbarbtn.click();
    }
};

export function DesktopItemBase({
    icon,
    smallIcon,
    name,
    className,
    win,
    isShortcut,
    titleBar,
    isWindowOpen = false,
    onWinClose,
    onContextMenu,
    id,
    ...p
}: DesktopItemProps) {
    return (
        <>
            <button
                id={id ?? (win?.id ? `${win.id}-desktop-item` : undefined)}
                className={cn(
                    "flex h-fit w-20 cursor-pointer select-none flex-col items-center rounded border border-dotted border-transparent px-2 py-1 text-center text-xs text-foreground/80 outline-none focus-within:bg-foreground/10 hover:bg-foreground/15 focus-visible:border-muted-foreground/80",
                    className,
                )}
                onContextMenu={(e) => {
                    e.currentTarget.focus();
                    DesktopItemContextMenuEmittor.setState(e.currentTarget.id);
                    onContextMenu && onContextMenu(e);
                }}
                {...p}
            >
                <div
                    className={clsx(
                        "relative",
                        smallIcon ? "size-10" : "size-11",
                    )}
                >
                    <Image src={icon} alt={name} width={45} height={45} />
                    {isShortcut && (
                        <Image
                            className="absolute bottom-0 left-0 size-8"
                            src="/icons/shortcut.ico"
                            alt=""
                            width={32}
                            height={32}
                        />
                    )}
                </div>
                <p className="line-clamp-2">{name}</p>
            </button>
            {win?.child && isWindowOpen && (
                <DraggableWindowBase
                    className={win.className}
                    // title={name}
                    image={win.image ?? icon}
                    titlebar={{ title: name, ...titleBar }}
                    id={win.id}
                    resizeAbleProps={win.resizeAbleProps}
                    onClose={onWinClose}
                    wrapperClassName={win.wrapperClassName}
                >
                    {win.child}
                </DraggableWindowBase>
            )}
        </>
    );
}

function DesktopItem({
    onDoubleClick,
    ...props
}: Omit<DesktopItemProps, "isWindowOpen" | "onWinClose">) {
    const [isWinShow, setIsWinShow] = useWinState(props.win?.id);

    const DblClickHandler: typeof onDoubleClick = (e) => {
        onDoubleClick?.(e);
        setIsWinShow(true);
    };

    return (
        <DesktopItemBase
            onDoubleClick={DblClickHandler}
            onWinClose={() => setIsWinShow(false)}
            isWindowOpen={isWinShow}
            {...props}
        />
    );
}

export default DesktopItem;
