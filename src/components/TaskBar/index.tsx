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
    dialogVariantsObj as dialogVariants,
} from "@/components/ui/dialog";
import SegoeIcon, { type SegoeIconsType } from "@/components/segoe-ui-icon";
import {
    clsx,
    clsxLite,
    cn,
    doubleClick,
    getDialogTriggerElement,
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
import { openExplorer } from "../desktop/explorer/emittors";
import Slider from "../fluentui/slider";
import { SystemTrayOptions } from "./system-tray-options";
import { BadgeBtnVariants } from "../fluentui/button";

function TaskBar() {
    return (
        <div className="acrylic-noise sticky bottom-0 z-[100] grid select-none grid-flow-col grid-cols-[1fr_5fr_1fr] items-center border-t border-foreground/5 bg-background/60 px-3 py-1 backdrop-blur-2xl">
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
                        <SegoeIcon
                            As={"button"}
                            className={clsx(
                                "rounded-md px-2 py-1 text-foreground/70",
                                taskbarBtnCNs,
                            )}
                            icon="Chevron Up Med"
                        />
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
                        className="bottom-14 right-2 w-[360px] gap-3 overflow-hidden p-0"
                        side={"bottom"}
                        align={"right"}
                        from={"right"}
                        mica={false}
                    >
                        <div className={cn(dialogVariants.mica.true)}>
                            Imran 1
                        </div>
                        <div className={cn(dialogVariants.mica.true, "grid font-segoe-ui-display")}>
                            <div className="inline-flex border-b border-background px-4 py-2.5">
                                <time className="text-sm hover:opacity-80">{format(new Date, "EEEE, MMMM d")}</time>
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

    function PinnedItem({ title, img }: { title: string; img: string }) {
        return (
            <button
                aria-label={title}
                className="taskbarBtn line-clamp-2 flex h-[5rem] w-[5.5rem] cursor-default flex-col items-center justify-start rounded-md pt-2 text-xs leading-4"
            >
                <img src={img} alt={title + "-img"} className="size-10" />
                {title}
            </button>
        );
    }

    function RecommendItem({
        title,
        img,
        date,
    }: React.ComponentProps<typeof PinnedItem> & { date: string }) {
        return (
            <button className="taskbarBtn grid h-14 cursor-default grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-1.5 gap-x-2 rounded-md px-3 py-3 text-[13px]">
                <img
                    className="row-span-2 size-10"
                    src={img}
                    alt={title + "-img"}
                />
                <span>{title}</span>
                <span className="text-foreground/70">{date}</span>
            </button>
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

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <TaskBarButton
                        autoFocus={false}
                        className="transition-all duration-300"
                        imgClassName="group-active:opacity-80 transition-all group-active:[filter:saturate(10)_hue-rotate(45deg)]"
                        src="/taskbar-icon.png"
                    />
                </DialogTrigger>
                <DialogContent
                    onPointerDownOutside={(e) => console.log("focus out side")}
                    // onFocusOutside={e=>e.cancelable}
                    side={"bottom"}
                    align={"center"}
                    from={"bottom"}
                    className={
                        "bottom-14 flex min-h-[620px] w-[600px] flex-col items-stretch justify-center overflow-hidden p-0"
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
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/projects.png"
                                title="Projects"
                            />
                            <PinnedItem
                                img={DesktopIcons.Projects}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name Name Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                            <PinnedItem
                                img={DesktopIcons.Folder}
                                title="Name"
                            />
                        </div>
                        <div className="mb-4 mt-7 flex justify-between px-6 text-sm font-semibold">
                            Recommended <GroupHeaderButton label="More" />
                        </div>
                        <div className="grid grid-cols-2 justify-items-stretch gap-2 px-4">
                            <RecommendItem
                                img={DesktopIcons.Projects}
                                title="Projects"
                                date="Recently added"
                            />
                            <RecommendItem
                                img={DesktopIcons.Folder}
                                title="Github"
                                date="1h ago"
                            />
                            <RecommendItem
                                img={DesktopIcons.Folder}
                                title="Github"
                                date="2h ago"
                            />
                        </div>
                    </div>
                    <div
                        id="startmenu-footer"
                        className="flex items-center justify-between border-t border-border/50 bg-background/30 px-12 py-3"
                    >
                        <FooterBtn As={"button"} className="text-[13px]">
                            <SegoeIcon
                                className="size-8 rounded-full bg-foreground/90 p-2 text-base text-background/50"
                                icon="Contact Solid"
                            />{" "}
                            Immi
                        </FooterBtn>
                        <div className="inline-flex items-center">
                            <FooterBtn
                                ChildAs="button"
                                As={SegoeIcon}
                                icon="Download"
                                onClick={(
                                    e: React.MouseEvent<
                                        HTMLButtonElement,
                                        MouseEvent
                                    >,
                                ) => {
                                    getDialogTriggerElement(e)?.click();
                                    setTimeout(() => openExplorer("skills"), 0);
                                }}
                            />

                            <FooterBtn
                                As={SegoeIcon}
                                ChildAs="button"
                                icon="Photo"
                            />
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
        <div className="inline-flex flex-col items-end whitespace-nowrap text-xs font-segoe-ui-display">
            <time>{format(time, "h:mm a")}</time>
            <time>{format(time, "M/d/y")}</time>
        </div>
    );
}

export default TaskBar;
