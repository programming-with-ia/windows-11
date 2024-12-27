/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { X } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import ThisPC from "@/app/_components/this-pc";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { CompoProps } from "@/types/types";
import { TbArrowElbowRight } from "react-icons/tb";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useEmittor } from "emittor";
import { explorerTabEmittor } from "./emittors";
import SegoeIcon from "@/components/segoe-ui-icon";
import { ExplorerItems } from "./_components/explorer-items";
import { doubleClick } from "@/lib/utils";

const skills = [
    // use images from GitHub repo
    { icon: "js.png", label: "JavaScript" },
    { icon: "mongodb.png", label: "MongoDB" },
    { icon: "mui.png", label: "Material UI" },
    { icon: "mysql.png", label: "MySQL" },
    { icon: "next.png", label: "Next.js" },
    { icon: "node.png", label: "Node.js" },
    { icon: "postgresql.png", label: "PostgreSQL" },
    { icon: "prisma.png", label: "Prisma" },
    { icon: "react.png", label: "React" },
    { icon: "reactnative.png", label: "React Native" },
    { icon: "reactquery.png", label: "React Query" },
    { icon: "redux.png", label: "Redux" },
    { icon: "stripe.png", label: "Stripe" },
    { icon: "tailwind.png", label: "Tailwind CSS" },
    { icon: "tauri.png", label: "Tauri" },
    { icon: "ts.png", label: "TypeScript" },
    { icon: "css.png", label: "CSS" },
    { icon: "docker.png", label: "Docker" },
    { icon: "express.png", label: "Express" },
    { icon: "figma.png", label: "Figma" },
    { icon: "firebase.png", label: "Firebase" },
    { icon: "framer.png", label: "Framer Motion" },
    { icon: "go.png", label: "Go" },
    { icon: "graphql.png", label: "GraphQL" },
    { icon: "html.png", label: "HTML" },
];

const tabs: Array<
    {
        title: string;
        id: string;
        img?:
            | string
            | ((p: CompoProps<typeof GitHubLogoIcon>) => React.ReactNode);
        tab?: () => React.ReactNode;
        props?: React.ComponentProps<"button" | "a">;
    } & (
        | { href: string; tab?: undefined }
        | {
              href?: undefined;
              tab: () => React.ReactNode;
          }
    )
> = [
    {
        title: "This PC",
        id: "this-pc",
        img: "/icons/pc.ico",
        tab: ThisPC,
    },
    {
        title: "About Me",
        id: "about-me",
        img: "/icons/user-folder.png",
        tab: AboutTab,
    },
    {
        title: "Skills",
        id: "skills",
        img: "/icons/tools-folder.png",
        tab: SkillsTab,
    },
    {
        title: "Projects",
        id: "projects",
        img: "/icons/projects.png",
        tab: ProjectsTab,
    },
    {
        title: "Github",
        id: "github",
        img: GitHubLogoIcon,
        href: "https://www.github.com",
        props: { target: "_blank" },
    },
    {
        title: "Twitter (X)",
        id: "twitter",
        img: FaSquareXTwitter,
        href: "https://www.x.com",
        props: { target: "_blank" },
    },
] as const;

const explorerTabMapped = {
    "about-me": AboutTab,
    "about-info": AboutInfoTab,
    skills: SkillsTab,
    projects: ProjectsTab,
    "this-pc": ThisPC,
} as const;

export type explorerTabsType = keyof typeof explorerTabMapped;

function AboutTab() {
    return (
        <>
            <ExplorerItems.Large
                icon="/icons/user-folder.png"
                label="Info"
                onDoubleClick={() => explorerTabEmittor.emit("about-info")}
            />
            <ExplorerItems.Large
                icon="/icons/tools-folder.png"
                onDoubleClick={() => explorerTabEmittor.emit("skills")}
                label="Skills"
            />
            <ExplorerItems.Large
                icon="/icons/projects.png"
                // onDoubleClick={() => explorerTabEmittor.emit('projects')}
                onDoubleClick={() => doubleClick("projects-desktop-item")}
                label="Projects"
                isShortcut
            />
            <ExplorerItems.Large
                onDoubleClick={() =>
                    window.open("https://www.github.com", "_blank")
                }
                icon="/icons/github-icon.png"
                label="Github"
                isShortcut
            />
        </>
    );
}
function AboutInfoTab() {
    return (
        <iframe
            src="https://odocs-md.vercel.app/shadcn-theme-editor"
            className="size-full"
        />
    );
}
function SkillsTab() {
    useEffect(() => {
        console.log("Skills Tab useEffect");
    });
    return (
        <>
            {skills.map((skill, idx) => (
                <ExplorerItems.Large
                    className="gap-1"
                    label={skill.label}
                    icon={
                        skill.icon.startsWith("/") ||
                        skill.icon.startsWith("http")
                            ? skill.icon
                            : `https://github.com/programming-with-ia/windows-11/raw/8298a01ffae8ad280ee74e18b20e841524be8845/public/skills/${skill.icon}`
                    }
                    key={idx}
                />
            ))}
        </>
    );
}
function ProjectsTab() {
    return <div>Projects</div>;
}

export function ExplorerTitleBar({ controls }: { controls: React.ReactNode }) {
    return (
        <>
            <div
                className="w-fit cursor-default px-3 pt-2"
                onPointerDown={(e) => e.stopPropagation()}
            >
                <div
                    data-explorer-tab
                    className="relative inline-flex min-w-60 items-center gap-2.5 bg-foreground/5 pl-2.5 text-xs"
                >
                    <Image
                        src={"/icons/explorer.png"}
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
                className="col-span-2 inline-flex w-full cursor-default items-center gap-3 bg-foreground/5 px-4 py-2 text-[14px] text-foreground/80"
                onPointerDown={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
            >
                <SegoeIcon icon="Arrow Left" className="p-2" />

                <SegoeIcon icon="Arrow Right" className="p-2" />

                <SegoeIcon icon="Arrow Up" className="p-2" />

                <SegoeIcon icon="Refresh" className="p-2" />
                <div className="inline-flex flex-1 items-center gap-1 rounded-md bg-foreground/5 px-3.5 py-1 text-foreground/80">
                    <SegoeIcon icon="TVMonitor" className="" />
                    <SegoeIcon
                        icon="Chevron Right"
                        className="flex size-6 items-center justify-center rounded-md p-2 text-xs text-foreground hover:bg-foreground/5"
                    />
                </div>
                <span className="inline-flex h-full min-w-44 items-center rounded-md bg-foreground/5 px-3.5 py-1.5 text-sm text-foreground/70">
                    Search This PC
                </span>
            </div>
        </>
    );
}

export function ExplorerMain() {
    const [CurrentTabKey, setCurrentTab] = useEmittor(
        // <
        //     (() => React.ReactNode) | undefined
        // >
        explorerTabEmittor,
        "about-me",
    );
    const CurrentTab = explorerTabMapped[CurrentTabKey ?? "about-me"];

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
                className="flex-1 select-none"
                direction="horizontal"
                autoSaveId="explorer-sidebar"
            >
                <ResizablePanel
                    defaultSize={30}
                    collapsible
                    maxSize={40}
                    minSize={15}
                    className="flex max-w-80 flex-col px-1 py-2"
                >
                    {tabs.map((item, idx) => {
                        const Child = (
                            <>
                                {item.img &&
                                    (typeof item.img == "string" ? (
                                        <span>
                                            {
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    width={16}
                                                    height={16}
                                                />
                                            }
                                        </span>
                                    ) : (
                                        <item.img className="size-4" />
                                    ))}
                                {item.title}
                            </>
                        );
                        return (
                            <Slot
                                key={idx}
                                className="group inline-flex items-center gap-2 rounded-sm border border-dotted border-transparent px-2.5 py-1.5 text-sm outline-none hover:bg-foreground/5 focus-visible:border-muted-foreground/80"
                                {...item.props}
                            >
                                {item.href ? (
                                    <Link href={item.href}>
                                        {Child}
                                        <TbArrowElbowRight className="ml-auto size-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                                    </Link>
                                ) : (
                                    <button
                                        className={clsx(
                                            CurrentTab == item.tab &&
                                                "bg-foreground/10",
                                        )}
                                        type="button"
                                        onClick={() =>
                                            setCurrentTab(item.id as any)
                                        }
                                    >
                                        {Child}
                                    </button>
                                )}
                            </Slot>
                        );
                    })}
                </ResizablePanel>
                <ResizableHandle className="w-1 bg-foreground/10 hover:bg-foreground/15" />
                <ResizablePanel
                    style={{ overflow: "auto" }}
                    className="customScrollBar flex max-h-full flex-wrap content-start gap-1 overflow-auto p-0.5 text-foreground/80"
                >
                    {CurrentTab && <CurrentTab />}
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}

const Explorer = {
    Window: ExplorerMain,
    TitleBar: ExplorerTitleBar,
} as const;

export default Explorer;
