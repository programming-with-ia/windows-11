/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import TaskBarButton, { taskbarBtnCNs } from "./button";
import TaskbarSearch from "./taskbar-search";
import { format } from "date-fns/format";
import useTime from "@/hooks/useTime";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
    dialogVariantsObj as dialogVariants,
} from "@/components/ui/dialog";
import SegoeIcon, { type SegoeIconsType } from "@/components/segoe-ui-icon";
import {
    clsx,
    clsxLite,
    cn,
    doubleClick,
    getDialogTriggerElement,
    joinPath,
    orUndef,
} from "@/lib/utils";
import { Component } from "../component";
import useOnlineStatus from "@/hooks/useOnline";
import { DesktopIcons } from "@/lib/images";
import { useBattery } from "@/hooks/useBattery";
import type { IntRange, ValueOf } from "type-fest";
import * as Popover from "@/components/ui/popover";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { withDefaultProps } from "@/lib/withDefaultProps";
import { ContextMenuItem } from "../ui/context-menu";
import { MenuClassNames } from "../ui/menu-cns";
import Link from "next/link";
import { routes } from "@/lib/routes-map";
import { LoadingLink } from "@/lib/loading/loading-comps";
import { CommonPaths, openExplorer } from "../desktop/explorer/emittors";
import Slider from "../fluentui/slider";
import { SystemTrayOptions } from "./system-tray-options";
import { BadgeBtnVariants } from "../fluentui/button";
import { siteConfig } from "@/lib/site-config";

function TaskBar() {
    return (
        <div className="acrylic-noise fixed inset-x-0 bottom-0 z-[100] grid h-[3.2rem] select-none grid-flow-col grid-cols-[1fr_5fr_1fr] items-center border-t border-foreground/5 bg-background/80 px-3 backdrop-blur-2xl dark:bg-background/60">
            <span></span>
            <div className="inline-flex w-full items-center justify-center gap-1">
                <StartButton />
                <TaskbarSearch />
                {/*//* for adding items */}
                <div data-taskbar-items className="inline-flex gap-1" />
            </div>
            <div className="flex justify-self-end text-foreground/80">
                <Popover.Popover>
                    <Popover.PopoverTrigger asChild>
                        <button
                            className={clsx(
                                taskbarBtnCNs,
                                "group inline-flex items-center rounded-md px-2 py-1 text-foreground/70",
                            )}
                        >
                            <SegoeIcon
                                className="transition-transform duration-150 ease-in-out group-data-[state=open]:rotate-180"
                                icon="Chevron Up Med"
                            />
                        </button>
                    </Popover.PopoverTrigger>
                    <Popover.PopoverContent
                        className="acrylic-noise grid size-fit select-none grid-cols-3 rounded-lg bg-secondary/60 p-1 text-foreground backdrop-blur-2xl !duration-200"
                        side="top"
                        sideOffset={12}
                    >
                        {[
                            DesktopIcons.Chrome,
                            DesktopIcons.GithubIcon,
                            DesktopIcons.Vscode,
                            DesktopIcons.Projects,
                        ].map((icon, idx) => (
                            <img
                                className={clsx(
                                    "size-9 rounded-md p-2",
                                    taskbarBtnCNs,
                                )}
                                key={idx}
                                src={icon}
                                alt={icon + "-img"}
                            />
                        ))}
                    </Popover.PopoverContent>
                </Popover.Popover>
                <SystemTrayOptions />
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            className={clsx(
                                "items-center justify-center gap-1.5 rounded-md px-2 py-1",
                                taskbarBtnCNs,
                            )}
                        >
                            <Time />
                            <SegoeIcon icon="Ringer" className="text-md" />
                        </button>
                    </DialogTrigger>
                    <DialogContent
                        className="bottom-[3.75rem] right-2 w-[360px] gap-3 overflow-hidden p-0"
                        side={"bottom"}
                        align={"right"}
                        from={"right"}
                        mica={false}
                    >
                        <div
                            className={cn(
                                dialogVariants.mica.true,
                                "flex h-52 flex-col px-4 py-2.5",
                            )}
                        >
                            <div className="flex">
                                <span className="text-sm">Notifications</span>
                                <svg
                                    width={24}
                                    height={24}
                                    className="ml-auto rounded-md bg-foreground/5 fill-current p-[5px] hocus:bg-foreground/10"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 3.5c-3.104 0-6 2.432-6 6.25v4.153L4.682 17h14.67l-1.354-3.093V11.75a.75.75 0 0 1 1.5 0v1.843l1.381 3.156a1.25 1.25 0 0 1-1.145 1.751H15a3.002 3.002 0 0 1-6.003 0H4.305a1.25 1.25 0 0 1-1.15-1.739l1.344-3.164V9.75C4.5 5.068 8.103 2 12 2c.86 0 1.705.15 2.5.432a.75.75 0 0 1-.502 1.413A5.964 5.964 0 0 0 12 3.5ZM12 20c.828 0 1.5-.671 1.501-1.5h-3.003c0 .829.673 1.5 1.502 1.5Z" />
                                    <path d="M15.25 7h-2.5l-.101.007A.75.75 0 0 0 12.75 8.5h1.043l-1.653 2.314-.055.09A.75.75 0 0 0 12.75 12h2.5l.102-.007a.75.75 0 0 0-.102-1.493h-1.042l1.653-2.314.055-.09A.75.75 0 0 0 15.25 7ZM21.25 2h-3.5l-.101.007A.75.75 0 0 0 17.75 3.5h2.134l-2.766 4.347-.05.09A.75.75 0 0 0 17.75 9h3.5l.102-.007A.75.75 0 0 0 21.25 7.5h-2.133l2.766-4.347.05-.09A.75.75 0 0 0 21.25 2Z" />
                                </svg>
                            </div>
                            <span className="m-auto inline-flex flex-1 items-center self-center justify-self-center text-[13px] opacity-80">
                                No new notifications
                            </span>
                        </div>
                        <div
                            className={cn(
                                dialogVariants.mica.true,
                                "grid font-segoe-ui-display",
                            )}
                        >
                            <div className="inline-flex border-b border-background px-4 py-2.5">
                                <time className="text-sm hover:opacity-80">
                                    {format(new Date(), "EEEE, MMMM d")}
                                </time>
                                <SegoeIcon
                                    className={clsxLite(
                                        BadgeBtnVariants({
                                            variant: "secondaryLite",
                                            size: "icon",
                                        }),
                                        "ml-auto",
                                    )}
                                    icon="Chevron Up"
                                />
                            </div>
                            <div className="inline-flex px-4 py-2.5 text-sm">
                                <span className="inline-flex gap-3">
                                    <SegoeIcon
                                        className={BadgeBtnVariants({
                                            variant: "secondaryLite",
                                            size: "icon",
                                        })}
                                        icon="Calculator Subtract"
                                    />
                                    <span>
                                        <b className="font-semibold">30</b> mins
                                    </span>
                                    <SegoeIcon
                                        className={BadgeBtnVariants({
                                            variant: "secondaryLite",
                                            size: "icon",
                                        })}
                                        icon="Calculator Addition"
                                    />
                                </span>
                                <span
                                    className={cn(
                                        BadgeBtnVariants({
                                            variant: "secondaryLite",
                                        }),
                                        "ml-auto gap-1",
                                    )}
                                >
                                    <SegoeIcon icon="Play Solid" />
                                    Focus
                                </span>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

function StartButton() {
    const FooterBtn = withDefaultProps(
        Component<"button" | typeof SegoeIcon, { icon?: SegoeIconsType }>,
        {
            className:
                "inline-flex h-10 items-center gap-1.5 rounded-md px-3 transition-colors hover:bg-foreground/10",
        },
    );
    // const a = (
    //     <FooterBtn
    //         As={SegoeIcon}
    //     ></FooterBtn>
    // );
    // function FooterButton({
    //     className,
    //     asChild,
    //     children,
    //     ...p
    // }: React.ComponentProps<"button"> & { asChild?: boolean }) {
    //     return (
    //         <Component
    //             As={asChild ? null : "button"}
    //             className={cn(
    //                 "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-[13px] transition-colors hover:bg-foreground/10",
    //                 className,
    //             )}
    //             {...p}
    //         >
    //             {children}
    //         </Component>
    //     );
    // }

    // const footerBtnCns =
    //     "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-[13px] transition-colors hover:bg-foreground/10";

    function PinnedItem({
        label,
        src,
        href,
        onClick,
        smallIcon,
    }: ImgBtnProps & { href?: string; smallIcon?: boolean }) {
        return (
            <DialogClose asChild>
                <Component
                    As={href ? "a" : "button"}
                    href={href}
                    target={href && "_blank"}
                    className="taskbarBtn group line-clamp-2 flex h-[5rem] w-[5.5rem] cursor-default flex-col items-center justify-start rounded-md p-0.5 pt-2 text-center text-xs leading-4"
                    aria-label={label}
                    onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => {
                        setTimeout(() => onClick?.(e), 10);
                        // getDialogTriggerElement(e)?.click();
                        // setTimeout(()=>onClick?.(e), 0);
                    }}
                >
                    <img
                        src={src}
                        alt={label + "-img"}
                        className={clsxLite(
                            "size-10 transition-transform duration-200 group-active:scale-[.8]",
                            smallIcon && "p-1",
                        )}
                    />
                    {label}
                </Component>
            </DialogClose>
        );
    }

    function RecommendItem({
        label,
        src,
        date,
        onClick,
        smallIcon,
    }: React.ComponentProps<typeof PinnedItem> & { date: string }) {
        return (
            <DialogClose asChild>
                <button
                    className="taskbarBtn grid h-14 cursor-default grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-1.5 gap-x-2 rounded-md px-3 py-3 text-[13px]"
                    onClick={onClick}
                >
                    <img
                        className={clsxLite(
                            "row-span-2 size-10",
                            smallIcon && "p-1",
                        )}
                        src={src}
                        alt={label + "-img"}
                    />
                    <span>{label}</span>
                    <span className="text-foreground/70">{date}</span>
                </button>
            </DialogClose>
        );
    }

    const GroupHeaderButton = ({ label }: { label: string }) => (
        <button
            className={cn(BadgeBtnVariants({ variant: "secondary" }), "gap-2")}
        >
            {label} <SegoeIcon icon="Chevron Right Med" />
        </button>
    );

    const PowerMenu = ({ btn }: { btn: React.ReactElement }) => {
        const [isOpen, setIsOpen] = useState(false);
        const handleOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            // if (e.isDefaultPrevented()) return
            setIsOpen(false);
        };
        return (
            <Popover.Popover open={isOpen} modal onOpenChange={setIsOpen}>
                <Popover.PopoverTrigger asChild>{btn}</Popover.PopoverTrigger>
                <Popover.PopoverContent
                    onClick={handleOpen}
                    className="p-overflow-hide w-fit rounded-lg border-foreground/5 p-1"
                    side="top"
                >
                    <LoadingLink
                        data-compact
                        prefetch
                        className={cn(
                            MenuClassNames.item,
                            "font-segoe-ui-display text-[14px]",
                        )}
                        href={routes.lock}
                    >
                        <SegoeIcon icon="Lock" />
                        Lock
                    </LoadingLink>
                    <span
                        data-compact
                        className={cn(
                            MenuClassNames.item,
                            "font-segoe-ui-display text-[14px]",
                        )}
                        onClick={() => alert("This feature is not available.")}
                    >
                        <SegoeIcon icon="Mob Quiet Hours" />
                        Sleep
                    </span>
                    <span
                        data-compact
                        className={cn(
                            MenuClassNames.item,
                            "font-segoe-ui-display text-[14px]",
                        )}
                        onClick={() => alert("Please close this tab manually")}
                    >
                        <SegoeIcon icon="Power Button" />
                        Shut down
                    </span>
                    <a
                        href={"/"}
                        data-compact
                        className={cn(
                            MenuClassNames.item,
                            "font-segoe-ui-display text-[14px]",
                        )}
                    >
                        <SegoeIcon icon="Refresh" className="-scale-x-100" />
                        Restart
                    </a>
                </Popover.PopoverContent>
            </Popover.Popover>
        );
    };

    const PinnedItems = [
        {
            label: "Chrome",
            src: DesktopIcons.Chrome,
            smallIcon: true,
            onClick: () => doubleClick("chrome-desktop-item"),
        },
        {
            label: "File Explorer",
            src: DesktopIcons.Explorer,
            smallIcon: true,
            onClick: () => doubleClick("explorer-desktop-item"),
        },
        {
            label: "VS Code",
            src: DesktopIcons.Vscode,
            smallIcon: true,
            onClick: () => doubleClick("vs-code-desktop-item"),
        },
        {
            label: "Calculator",
            src: DesktopIcons.Calculator,
            onClick: () => doubleClick("calculator-desktop-item"),
        },
        {
            label: "Github",
            src: DesktopIcons.GithubIcon,
            href: siteConfig.repo,
        },
        {
            label: "Moto X3M",
            src: DesktopIcons.MotoX3M,
            smallIcon: true,
            onClick: () => doubleClick("moto-x3m-desktop-item"),
        },
        {
            label: "Speed Master",
            src: DesktopIcons.SpeedMaster,
            smallIcon: true,
            onClick: () => doubleClick("speed-master-desktop-item"),
        },
        {
            label: "Notepad",
            src: DesktopIcons.Notepad,
            smallIcon: true,
            onClick: () => doubleClick("notepad-desktop-item"),
        },
        {
            label: "Spotify",
            src: DesktopIcons.Spotify,
            smallIcon: true,
            onClick: () => doubleClick("spotify-desktop-item"),
        },
        {
            label: "X (Twitter)",
            src: DesktopIcons.X,
            href: siteConfig.authors.twitter,
        },
        {
            label: "GMail",
            src: DesktopIcons.Gmail,
            href: `mailto:${siteConfig.authors.email}`,
        },
        {
            label: "Microsoft Store",
            smallIcon: true,
            src: DesktopIcons.msStore,
            onClick: () => doubleClick("ms-store-desktop-item"),
        },
        {
            label: "Create OWN App",
            smallIcon: true,
            src: "https://raw.githubusercontent.com/programming-with-ia/public-files/0e77acf319696f37be023fe5134f174f319f0700/create-own-app/assets/create-own-app-logo.png",
            href: "https://own-app.oimmi.com/",
        },
        {
            label: "Settings",
            smallIcon: true,
            src: DesktopIcons.Settings,
        },
    ] as const satisfies React.ComponentProps<typeof PinnedItem>[];

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <TaskBarButton
                        autoFocus={false}
                        className="transition-all duration-300"
                        imgClassName="group-active:opacity-80 transition-all group-active:[filter:saturate(0.8)] dark:group-active:[filter:saturate(10)_hue-rotate(45deg)]"
                        src="/start-light.ico"
                        lightSrc="/start-dark.ico"
                    />
                </DialogTrigger>
                <DialogContent
                    onPointerDownOutside={(e) => console.log("focus out side")}
                    // onFocusOutside={e=>e.cancelable}
                    side={"bottom"}
                    align={"center"}
                    from={"bottom"}
                    className={
                        "bottom-[3.75rem] flex min-h-[620px] w-[600px] flex-col items-stretch justify-center overflow-hidden p-0 dark:backdrop-brightness-50"
                    }
                >
                    <div className="flex flex-1 flex-col px-8 py-8">
                        <input
                            placeholder="Search for apps, settings, and documents"
                            className="rounded-full border border-foreground/10 bg-background/50 px-4 py-1 text-sm text-foreground/90 outline-none"
                        />
                        <div className="mb-4 mt-7 flex justify-between px-6 text-sm font-semibold tracking-wider">
                            Pinned <GroupHeaderButton label="All apps" />
                        </div>
                        <div className="flex flex-1 flex-wrap content-start justify-start">
                            {PinnedItems.map((pItem, idx) => (
                                <PinnedItem key={idx} {...pItem} />
                            ))}
                        </div>
                        <div className="mb-4 mt-7 flex justify-between px-6 text-sm font-semibold">
                            Recommended <GroupHeaderButton label="More" />
                        </div>
                        <div className="grid grid-cols-2 justify-items-stretch gap-2 px-4">
                            {[
                                { ...PinnedItems[2], date: "Recently added" },
                                { ...PinnedItems[5], date: "1h ago" },
                                { ...PinnedItems[8], date: "2h ago" },
                            ]
                                .filter((pItem) => pItem.label)
                                .map((pItem, idx) => (
                                    <RecommendItem
                                        smallIcon={pItem.smallIcon}
                                        src={pItem.src}
                                        date={pItem.date}
                                        label={pItem.label}
                                        key={idx}
                                        onClick={pItem.onClick}
                                    />
                                ))}
                            {/* <RecommendItem
                                src={DesktopIcons.Projects}
                                label="Projects"
                                date="Recently added"
                            />
                            <RecommendItem
                                src={DesktopIcons.Folder}
                                label="Github"
                                date="1h ago"
                            />
                            <RecommendItem
                                src={DesktopIcons.Folder}
                                label="Github"
                                date="2h ago"
                            /> */}
                        </div>
                    </div>
                    <div
                        id="startmenu-footer"
                        className="flex items-center justify-between border-t border-border/50 bg-background/50 px-12 py-3 dark:bg-black/20"
                    >
                        <FooterBtn As={"button"} className="text-[13px]">
                            <SegoeIcon
                                className="dark size-8 rounded-full bg-foreground/90 p-2 text-base text-background/50"
                                icon="Contact Solid"
                            />{" "}
                            Immi
                        </FooterBtn>
                        <div className="inline-flex items-center">
                            <DialogClose asChild>
                                <FooterBtn
                                    ChildAs="button"
                                    As={SegoeIcon}
                                    icon="Download"
                                    onClick={() =>
                                        setTimeout(
                                            () =>
                                                openExplorer(
                                                    joinPath(
                                                        CommonPaths.user,
                                                        "Downloads",
                                                    ),
                                                ),
                                            10,
                                        )
                                    }
                                />
                            </DialogClose>
                            <DialogClose asChild>
                                <FooterBtn
                                    As={SegoeIcon}
                                    ChildAs="button"
                                    icon="Photo"
                                    onClick={() =>
                                        setTimeout(
                                            () =>
                                                openExplorer(
                                                    joinPath(
                                                        CommonPaths.user,
                                                        "Pictures",
                                                    ),
                                                ),
                                            10,
                                        )
                                    }
                                />
                            </DialogClose>

                            <PowerMenu
                                btn={
                                    <FooterBtn
                                        As={SegoeIcon}
                                        ChildAs="button"
                                        icon="Power Button"
                                    />
                                }
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function Time() {
    const time = useTime();
    return (
        <div className="inline-flex flex-col items-end whitespace-nowrap font-segoe-ui-display text-xs">
            <time>{format(time, "h:mm a")}</time>
            <time>{format(time, "M/d/y")}</time>
        </div>
    );
}

export default TaskBar;
