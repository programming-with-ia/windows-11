"use client";
import { clsx, cn } from "@/lib/utils";
// import Image from "next/image";
import React from "react";
import { type DraggableWindowProps } from "../drag-window";
import dynamic from "next/dynamic";
import { useWinState } from "@/hooks/useWinState";
import { DesktopItemContextMenuEmittor } from "@/lib/emittors";
import { DesktopIcons } from "@/lib/images";
import { Component } from "../component";
import { composeEventHandlers } from "@radix-ui/primitive";
// import { AnimatePresence } from "framer-motion";
const DraggableWindowBase = dynamic(() =>
    import("../drag-window").then((all) => all.DraggableWindowBase),
);

type DesktopItemProps<E extends React.ElementType = "button"> =
    React.ComponentProps<E> & {
        icon: string;
        smallIcon?: boolean;
        name: string;
        isShortcut?: boolean;
        isWindowOpen?: boolean;
        As?: E;
        win?: {
            child: React.ReactNode;
        } & Pick<
            DraggableWindowProps,
            | "image"
            | "wrapperClassName"
            | "className"
            | "id"
            | "resizeAbleProps"
            | "style"
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

export function DesktopItemBase<E extends React.ElementType = "button">({
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
    As = "button" as E,
    ...p
}: DesktopItemProps<E>) {
    return (
        <>
            <Component
                As={As}
                id={id ?? (win?.id ? `${win.id}-desktop-item` : undefined)}
                className={cn(
                    "flex h-fit w-20 cursor-pointer select-none flex-col items-center rounded border border-dotted border-transparent px-2 py-1 text-center text-xs text-foreground/80 outline-none focus-within:bg-foreground/10 hover:bg-foreground/15 focus-visible:border-muted-foreground/80",
                    className,
                )}
                onContextMenu={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.focus();
                    DesktopItemContextMenuEmittor.setState(e.currentTarget.id);
                    onContextMenu?.(e);
                }}
                {...p}
            >
                <div
                    className={clsx(
                        "relative",
                        smallIcon ? "size-10" : "size-11",
                    )}
                >
                    <img src={icon} alt={name} width={45} height={45} />
                    {isShortcut && (
                        <img
                            className="absolute bottom-0 left-0 size-8"
                            src={DesktopIcons.Shortcut}
                            alt=""
                            width={32}
                            height={32}
                        />
                    )}
                </div>
                <p className="line-clamp-2">{name}</p>
            </Component>
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
                    style={win.style}
                >
                    {win.child}
                </DraggableWindowBase>
            )}
        </>
    );
}

export function LinkDesktopItem({
    href,
    onDoubleClick,
    onClick,
    ...p
}: Pick<DesktopItemProps, "name" | "icon" | "isShortcut"> &
    React.ComponentPropsWithoutRef<"a">) {
    return (
        <DesktopItemBase
            As="a"
            {...p}
            href={href}
            onClick={composeEventHandlers(onClick, (e) => e.preventDefault())}
            onDoubleClick={composeEventHandlers(onDoubleClick, (e) => {
                window.open(href, "_blank");
            })}
        />
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
