import { DesktopItemBase } from "@/components/desktop/desktop-item";
import { useWinState } from "@/hooks/useWinState";
import dynamic from "next/dynamic";
import React from "react";
const Projects = dynamic(() => import("@/components/projects"));

function ProjectsItem() {
    const [isWinShow, setIsWinShow] = useWinState("projects");
    return (
        <>
            <DesktopItemBase
                isWindowOpen={isWinShow}
                onWinClose={() => setIsWinShow(false)}
                onDoubleClick={() => setIsWinShow(true)}
                icon="/icons/projects.png"
                name="Projects"
                isShortcut
                id="projects-desktop-item"
                titleBar={{ className: "backdrop-blur-none bg-transparent" }}
                win={{
                    child: isWinShow ? <Projects /> : "nothing",
                    id: "projects",
                    className:
                        "bg-transparent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/80 scrollbar-corner-red-500 scrollbar-thumb-rounded-full hover:scrollbar-thumb-red-500 scrollbar-track-rounded-full p-6 mx-auto overflow-y-auto overflow-x-hidden",
                    resizeAbleProps: {
                        minWidth: 600,
                        minHeight: 500,
                        defaultSize: {
                            width: "75vw",
                            height: "600px",
                        },
                    },
                    wrapperClassName: "backdrop-blur-2xl bg-background/80",
                }}
            />
        </>
    );
}

export default ProjectsItem;
