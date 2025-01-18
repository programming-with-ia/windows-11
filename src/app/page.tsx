"use client";

import DesktopItem, {
    LinkDesktopItem,
} from "@/components/desktop/desktop-item";
import TaskBar from "@/components/TaskBar";
import React, { useEffect } from "react";
import Explorer from "@/components/desktop/explorer";
import Iframe from "@/components/iframe";
// import YouTubeEmbed from "@/components/youtube";
import CalculatorItem from "@/components/lazy-items/calculator-item";
import ExplorerDesktopItem from "@/components/desktop/explorer-desktop-item";
import { Component } from "@/components/component";
// import ProjectsItem from "@/components/lazy-items/projects-item";
import Link from "next/link";

import { routes } from "@/lib/routes-map";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
    AddNew,
    DisplaySetting,
    GridViewAll,
    PaintBursh,
    ShowMoreOptons,
    SortIcon,
} from "@/components/icons";
import SegoeIcon from "@/components/segoe-ui-icon";
import { withDefaultProps } from "@/lib/withDefaultProps";
import { DesktopItemContextMenuEmittor } from "@/lib/emittors";
import { doubleClick, joinPath } from "@/lib/utils";
import Construction from "@/icons/construction";
import FullScreenBtn from "@/components/desktop/full-screen-item";
// import useIsSignedIn from "@/hooks/useIsSignedIn";
import { DesktopIcons } from "@/lib/images";
import { CommonPaths } from "@/components/desktop/explorer/emittors";
import { siteConfig } from "@/lib/site-config";

function Page() {
    //* need this
    // const isSignedIn = useIsSignedIn();
    // if (!isSignedIn) return null;
    return (
        <Wrapper>
            <ContextMenuWrapper>
                <div
                    id="viewport"
                    className="sticky top-0 mb-[3.2rem] grid flex-1 grid-flow-col overflow-visible"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(5rem, 1fr))",
                        gridTemplateRows:
                            "repeat(auto-fill, minmax(5.4rem, 1fr))",
                    }}
                >
                    <ExplorerDesktopItem
                        icon={DesktopIcons.PC}
                        name="This PC"
                        explorerPath={CommonPaths.pc}
                    />
                    <Explorer />
                    <CalculatorItem />
                    <DesktopItem
                        icon={DesktopIcons.Chrome}
                        name="Chrome"
                        className="gap-2"
                        isShortcut
                        win={{
                            child: (
                                <Iframe
                                    icon={DesktopIcons.Chrome}
                                    allowTransparency
                                    title="chorme"
                                    src="https://www.google.com?dark=1&ui=dark&igu=1"
                                />
                            ), //https://www.google.com/?igu=1
                            id: "chrome",
                            resizeAbleProps: {
                                minHeight: 540,
                                minWidth: 650,
                            },
                        }}
                    />
                    <DesktopItem
                        icon={DesktopIcons.Vscode}
                        name="VS Code"
                        isShortcut
                        smallIcon
                        className="gap-2"
                        win={{
                            child: (
                                <Iframe
                                    icon={DesktopIcons.Vscode}
                                    src="https://github1s.com/programming-with-ia/shadcn-theme-editor/blob/master/README.md"
                                />
                            ),
                            id: "vs-code",
                        }}
                    />
                    {/* <DesktopItem
                        icon="/icons/youtube.ico"
                        name="Youtube"
                        isShortcut
                        smallIcon
                        className="gap-2"
                        win={{ child: <YouTubeEmbed />, id: "youtube" }}
                    /> */}
                    {/* <DesktopItem icon="/icons/game.ico" name="Game" isShortcut smallIcon className="gap-2" win={{child: <Iframe src="https://g.poppigames.com/pp/purble-place/" />, id: "friv-game"}} /> */}
                    {/* <DesktopItem icon={DesktopIcons.Vscode} name="Tic Tac Toe" isShortcut smallIcon className="gap-2" win={{child: <Iframe src="https://www.onlinegames.io/games/2021/unity2/tic-tac-toe/index.html" />, id: "tic-tac-toe"}} /> */}
                    <DesktopItem
                        icon={DesktopIcons.MotoX3M}
                        name="Moto X3M"
                        isShortcut
                        smallIcon
                        className="gap-2"
                        win={{
                            child: (
                                <Iframe
                                    icon={DesktopIcons.MotoX3M}
                                    src="https://play.famobi.com/moto-x3m/A1000-10A"
                                />
                            ),
                            id: "moto-x3m",
                        }}
                    />
                    <DesktopItem
                        icon={DesktopIcons.SpeedMaster}
                        name="Speed Master"
                        isShortcut
                        smallIcon
                        className="gap-2"
                        win={{
                            child: (
                                <Iframe
                                    icon={DesktopIcons.SpeedMaster}
                                    src="https://play.famobi.com/wrapper/speed-master/A1000-10"
                                />
                            ),
                            id: "speed-master",
                        }}
                    />
                    <DesktopItem
                        icon={DesktopIcons.msStore}
                        smallIcon
                        name="Microsoft Store"
                        className="gap-1"
                        isShortcut
                        win={{
                            child: (
                                <Iframe
                                    icon={DesktopIcons.msStore}
                                    src="https://apps.microsoft.com/home"
                                />
                            ),
                            id: "ms-store",
                        }}
                    />
                    <DesktopItem
                        icon={DesktopIcons.Spotify}
                        name="Spotify"
                        className="gap-1"
                        isShortcut
                        win={{
                            child: (
                                <Iframe
                                    style={{borderRadius: 12}}
                                    icon={DesktopIcons.Spotify}
                                    src="https://open.spotify.com/embed/artist/7vk5e3vY1uw9plTHJAMwjN?utm_source=generator"
                                />
                            ),
                            id: "spotify",
                        }}
                    />
                    {/* <DesktopItem icon="/icons/projects.png" name="Projects" isShortcut className="gap-2" win={{child: <Iframe src="https://play.famobi.com/wrapper/speed-master/A1000-10" />, id: "projects"}} /> */}
                    {/* <ProjectsItem /> */}
                    {/* <ExplorerDesktopItem
                        name="Projects"
                        explorerPath={joinPath(CommonPaths.desktop, "Projects")}
                    /> */}
                    <LinkDesktopItem
                        icon={DesktopIcons.GithubIcon}
                        isShortcut
                        name="Github"
                        id="gh-repo-desktop-item"
                        href={siteConfig.repo}
                    />
                    <DesktopItem
                        name="Notepad"
                        className="gap-1"
                        icon={DesktopIcons.Notepad}
                        isShortcut
                        smallIcon
                        win={{
                            id: "notepad",
                            child: (
                                <textarea
                                    wrap="off"
                                    className="fluent-scrollbar size-full resize-none scroll-p-8 bg-transparent p-2 pb-6 text-lg outline-none"
                                />
                            ),
                        }}
                    />

                    {/* <div title="This Project Currently in Development" className="w-20 flex flex-col gap-1 select-none -col-end-1 row-start-2 animate-bounce text-xs text-foreground/80 text-center">
                        <Construction className="" /> In Development
                    </div> */}
                    <FullScreenBtn className="-col-end-1 -row-end-1" />
                </div>
            </ContextMenuWrapper>
            <TaskBar />
        </Wrapper>
    );
}

function DesktopMenuHandler({
    DesktopItem_MenuItems,
    DesktopMenuItems,
}: {
    DesktopItem_MenuItems?: React.ReactNode;
    DesktopMenuItems: React.ReactNode;
}) {
    console.log("HandleFileContextItems");
    return (
        <>
            {DesktopItemContextMenuEmittor.state
                ? DesktopItem_MenuItems
                : DesktopMenuItems}
        </>
    );
}

function ContextMenuWrapper({ children }: React.ComponentProps<"div">) {
    const MenuIcon = withDefaultProps(
        Component<typeof SegoeIcon | typeof GridViewAll>,
        { className: "size-4 fill-current text-foreground/70" },
    );
    const Arrow = (
        <SegoeIcon
            className="ml-auto text-xs opacity-80"
            icon="Chevron Right"
        />
    );
    return (
        <ContextMenu
            onOpenChange={(open) =>
                !open && DesktopItemContextMenuEmittor.setMatchState("")
            }
        >
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent collisionPadding={{ bottom: 60 }}>
                <DesktopMenuHandler
                    DesktopMenuItems={
                        <>
                            <ContextMenuItem>
                                <MenuIcon As={GridViewAll} />
                                View {Arrow}
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <MenuIcon As={SortIcon} />
                                Sort by {Arrow}
                            </ContextMenuItem>
                            <ContextMenuItem>
                                {/* @ts-ignore */}
                                <MenuIcon As={SegoeIcon} icon="Refresh" />
                                Refresh
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <MenuIcon As={AddNew} />
                                New {Arrow}
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <MenuIcon As={DisplaySetting} />
                                Display Settings
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <MenuIcon As={PaintBursh} />
                                Personalize
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <MenuIcon As={ShowMoreOptons} />
                                Show more options
                            </ContextMenuItem>
                        </>
                    }
                    DesktopItem_MenuItems={
                        <>
                            <ContextMenuItem
                                onClick={(e) => {
                                    const id =
                                        DesktopItemContextMenuEmittor.state; // direct use of `DesktopItemContextMenuEmittor.state` inside `setTimeout()` is not working as aspected
                                    setTimeout(() => {
                                        doubleClick(id);
                                    }, 0);
                                }}
                            >
                                <MenuIcon
                                    As={SegoeIcon}
                                    // @ts-ignore
                                    icon="Open In New Window"
                                />
                                Open
                            </ContextMenuItem>
                        </>
                    }
                />
            </ContextMenuContent>
        </ContextMenu>
    );
}

function Wrapper({ children }: React.ComponentPropsWithRef<"div">) {
    useEffect(() => {
        // clear all search params (for authorized that set from the lockscreen)
        if (process.env.NODE_ENV != "development") {
            const url = new URL(window.location.href);
            url.search = "";
            history.replaceState(null, "", url.toString());
        }

        // todo lazy-load-fix dispay: none
        const element = document.getElementById("screen");
        if (!element) return;
        console.log("observing...", element);
        const observer = new MutationObserver(() => {
            element.style.display = "flex";
        });

        observer.observe(element, {
            attributes: true,
            attributeFilter: ["style"],
        });

        return () => observer.disconnect();
    }, []);
    return (
        <main
            id="screen"
            className="flex h-screen w-screen flex-col overflow-hidden"
        >
            {/* <div id="lazy-load-fix" className="!contents"> */}
                {children}
            {/* </div> */}
            <div className="sr-only" aria-hidden aria-disabled data-preload>
                <img
                    loading="eager"
                    src="https://i.ibb.co/Jk7gMHT/bg-dark.jpg"
                    alt="dark-img"
                />
                <img
                    loading="eager"
                    src="https://i.ibb.co/DVd7w5f/bg-light.jpg"
                    alt="light-img"
                />
            </div>
        </main>
    );
}
export default Page;
