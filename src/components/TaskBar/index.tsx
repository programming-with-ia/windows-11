/* eslint-disable @next/next/no-img-element */
import React from "react";
import TaskBarButton from "./button";
import TaskbarSearch from "./taskbar-search";
import { format } from "date-fns/format";
import useTime from "@/hooks/useTime";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SegoeIcon from "../segoe-ui-icon";
import { cn } from "@/lib/utils";
import { Component } from "../component";
import useOnlineStatus from "@/hooks/useOnline";

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
                <SegoeIcon
                    className="inline-flex cursor-pointer rounded-md px-2 py-1 text-foreground/70 hover:bg-foreground/5"
                    icon="Chevron Up Med"
                />
                <div className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-md px-2.5 py-1 hover:bg-foreground/5">
                    <EthernetIcon />
                    <SegoeIcon icon="Volume" />
                </div>
                <div className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 py-1 hover:bg-foreground/5">
                    <Time />
                    <SegoeIcon icon="Ringer" className="text-md" />
                </div>
            </div>
        </div>
    );
}

function EthernetIcon(p: Omit<React.ComponentProps<typeof SegoeIcon>, "icon">) {
    const online = useOnlineStatus();
    return <SegoeIcon {...p} icon={online ? "Ethernet" : "Ethernet Error"} />;
}

function StartButton() {
    function FooterButton({
        className,
        asChild,
        children,
        ...p
    }: React.ComponentProps<"button"> & { asChild?: boolean }) {
        return (
            <Component
                As={asChild ? null : "button"}
                className={cn(
                    "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-[13px] transition-colors hover:bg-foreground/10",
                    className,
                )}
                {...p}
            >
                {children}
            </Component>
        );
    }

    function PinnedItem({ title, img }: { title: string; img: string }) {
        return (
            <button
                aria-label={title}
                className="line-clamp-2 flex h-[5rem] w-[5.5rem] flex-col items-center justify-start rounded-md pt-2 text-xs leading-4 hover:bg-foreground/10"
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
            <button className="grid h-14 grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-1.5 gap-x-2 rounded-md px-3 py-3 text-[13px] hover:bg-foreground/10">
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
        <button className="inline-flex justify-between gap-2 rounded-md bg-foreground/10 px-2 py-1 text-xs font-normal hover:bg-foreground/15">
            {label} <SegoeIcon icon="Chevron Right Med" />
        </button>
    );

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <TaskBarButton
                        className="transition-all duration-300 data-[state='open']:pointer-events-none data-[state='open']:bg-foreground/5"
                        imgClassName="group-active:opacity-80 transition-all group-active:[filter:saturate(10)_hue-rotate(45deg)]"
                        src="/taskbar-icon.png"
                    />
                </DialogTrigger>
                <DialogContent
                    side={"bottom"}
                    align={"center"}
                    from={"bottom"}
                    className={
                        "acrylic-noise bottom-14 flex min-h-[620px] w-[600px] cursor-default select-none flex-col items-stretch justify-center gap-0 overflow-hidden bg-secondary/60 p-0 text-foreground backdrop-blur-2xl !duration-200"
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
                            <PinnedItem img="/icons/folder.png" title="Name" />
                            <PinnedItem
                                img="/icons/projects.png"
                                title="Projects"
                            />
                            <PinnedItem
                                img="/icons/projects.ico"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name Name Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                            <PinnedItem
                                img="/icons/tools-folder.png"
                                title="Name"
                            />
                        </div>
                        <div className="mb-4 mt-7 flex justify-between px-6 text-sm font-semibold">
                            Recommended <GroupHeaderButton label="More" />
                        </div>
                        <div className="grid grid-cols-2 justify-items-stretch gap-2 px-4">
                            <RecommendItem
                                img="/icons/projects.png"
                                title="Projects"
                                date="Recently added"
                            />
                            <RecommendItem
                                img="/icons/folder.png"
                                title="Github"
                                date="1h ago"
                            />
                            <RecommendItem
                                img="/icons/folder.png"
                                title="Github"
                                date="2h ago"
                            />
                        </div>
                    </div>
                    <div
                        id="startmenu-footer"
                        className="flex items-center justify-between border-t border-border/50 bg-background/30 px-12 py-3"
                    >
                        <FooterButton>
                            <SegoeIcon
                                className="size-8 rounded-full bg-foreground/90 p-2 text-base text-background/50"
                                icon="Contact Solid"
                            />{" "}
                            Immi
                        </FooterButton>
                        <div className="inline-flex items-center">
                            <FooterButton
                                asChild
                                className="aspect-square text-base"
                            >
                                <SegoeIcon As={"button"} icon="Download" />
                            </FooterButton>
                            <FooterButton
                                asChild
                                className="aspect-square text-base"
                            >
                                <SegoeIcon As={"button"} icon="Photo" />
                            </FooterButton>
                            <FooterButton
                                asChild
                                className="aspect-square text-base"
                            >
                                <SegoeIcon As={"button"} icon="Power Button" />
                            </FooterButton>
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
        <div className="inline-flex flex-col items-end text-xs">
            <time>{format(time, "h:mm a")}</time>
            <time>{format(time, "M/d/y")}</time>
        </div>
    );
}

export default TaskBar;
