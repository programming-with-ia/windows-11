import { DesktopIcons, ExplorerIcons, GH_PublicTree } from "@/lib/images";
import { ValueOf } from "type-fest";
import { FolderTreeProps, NavigationTreeNode } from "./navigation-pane";
import { explorerPathEmittor } from "./emittors";
import { joinPath } from "@/lib/utils";

// use images from GitHub repo
export const skills = (
    [
        { icon: "/skills/js.png", label: "JavaScript" },
        { icon: "/skills/mongodb.png", label: "MongoDB" },
        { icon: "/skills/mui.png", label: "Material UI" },
        { icon: "/skills/mysql.png", label: "MySQL" },
        { icon: "/skills/next.png", label: "Next.js" },
        { icon: "/skills/node.png", label: "Node.js" },
        { icon: "/skills/postgresql.png", label: "PostgreSQL" },
        { icon: "/skills/prisma.png", label: "Prisma" },
        { icon: "/skills/react.png", label: "React" },
        { icon: "/skills/reactnative.png", label: "React Native" },
        { icon: "/skills/reactquery.png", label: "React Query" },
        { icon: "/skills/redux.png", label: "Redux" },
        { icon: "/skills/stripe.png", label: "Stripe" },
        { icon: "/skills/tailwind.png", label: "Tailwind CSS" },
        { icon: "/skills/tauri.png", label: "Tauri" },
        { icon: "/skills/ts.png", label: "TypeScript" },
        { icon: "/skills/css.png", label: "CSS" },
        { icon: "/skills/docker.png", label: "Docker" },
        { icon: "/skills/express.png", label: "Express" },
        { icon: "/skills/figma.png", label: "Figma" },
        { icon: "/skills/firebase.png", label: "Firebase" },
        { icon: "/skills/framer.png", label: "Framer Motion" },
        { icon: "/skills/go.png", label: "Go" },
        { icon: "/skills/graphql.png", label: "GraphQL" },
        { icon: "/skills/html.png", label: "HTML" },
    ] as const
).map((s) => ({ label: s.label, icon: `${GH_PublicTree}${s.icon}` }));

const HandleFolderExpand: ValueOf<FolderTreeProps["data"]>["onExpand"] = ({
    files,
    folders,
    icon,
    name,
    path,
}) => console.log(path);

function addKeysToNestedObject<
    T extends Record<string | number | symbol, unknown>,
    Obj = Record<string, T>,
>(obj: Obj, inheritBy: keyof T, keyValuePairs: Partial<T>): Obj {
    // Create a new object to avoid mutating the original
    const newObj = {} as Obj;

    // Iterate over the keys of the object
    for (const key in obj) {
        const value = obj[key] as T;
        const isObj = value && typeof value === "object";

        newObj[key] = value as any;

        if (!isObj) continue;
        for (const newKey in keyValuePairs) {
            if (newKey in value) continue;
            value[newKey] = keyValuePairs[newKey] as any;
        }

        if (inheritBy in value) {
            (newObj[key] as any)[inheritBy] = addKeysToNestedObject(
                value[inheritBy],
                inheritBy,
                keyValuePairs,
            ) as any;
        }
    }

    return newObj;
}

export function getDataByPath(path: string) {
    let data: NavigationTreeNode = {};
    const paths = path?.split("\\");

    // if (!paths?.length) return emptyMessage;
    if (path && paths?.length) {
        data = navigationData[paths[0]!] ?? {};
        for (const fn of paths.slice(1)) {
            data = data?.folders?.[fn] ?? {};
        }
    }
    return data;
}

export const navigationData = addKeysToNestedObject<NavigationTreeNode>(
    {
        "This PC": {
            icon: DesktopIcons.PC,
            initExpand: true,
            folders: {
                "Local Disk (C:)": {
                    files: ["boot.ini", "autoexec.bat"],
                    folders: {
                        Empty: {},
                        Users: {
                            folders: {
                                Public: {
                                    files: ["readme.txt"],
                                },
                                Admin: {
                                    files: ["document.docx", "notes.txt"],
                                    folders: {
                                        Desktop: {
                                            files: [
                                                "shortcut.lnk",
                                                "tasklist.txt",
                                            ],
                                            icon: ExplorerIcons.FolderDesktop,
                                        },
                                        Music: {
                                            icon: ExplorerIcons.FolderMusic,
                                        },
                                        Pictures: {
                                            icon: ExplorerIcons.FolderPictures,
                                        },
                                        Videos: {
                                            icon: ExplorerIcons.FolderVideos,
                                        },
                                        Downloads: {
                                            files: [
                                                "installer.exe",
                                                "image.png",
                                            ],
                                            icon: ExplorerIcons.FolderDownloads,
                                        },
                                        Documents: {
                                            files: [
                                                "resume.pdf",
                                                "project.xlsx",
                                            ],
                                            icon: ExplorerIcons.FolderDocuments,
                                        },
                                    },
                                },
                            },
                        },
                        "Program Files": {
                            folders: {
                                Microsoft: {
                                    files: ["app.exe", "readme.md"],
                                },
                                Adobe: {
                                    files: ["setup.exe"],
                                },
                            },
                        },
                        Windows: {
                            files: ["win.ini", "system32.dll"],
                            folders: {
                                System32: {
                                    files: ["cmd.exe", "config.sys"],
                                },
                                Logs: {
                                    files: ["error.log", "setup.log"],
                                },
                            },
                        },
                    },
                    icon: ExplorerIcons.WindowsDrive,
                },
                "Local Disk (D:)": {
                    files: ["movie.mp4", "backup.zip"],
                    folders: {
                        Games: {
                            files: ["game.exe", "savefile.dat"],
                        },
                        Projects: {
                            files: ["plan.docx", "budget.xlsx"],
                            folders: {
                                "2025": {
                                    files: ["timeline.pptx"],
                                },
                            },
                        },
                    },
                    icon: ExplorerIcons.Drive,
                },
                "Local Disk (E:)": {
                    folders: {
                        Music: {
                            files: ["song.mp3", "playlist.m3u"],
                        },
                        Photos: {
                            files: ["vacation.jpg", "portrait.png"],
                            folders: {
                                "2024": {
                                    files: ["beach.jpg", "hiking.png"],
                                },
                            },
                        },
                    },
                    icon: ExplorerIcons.Drive,
                },
            },
        },
    } satisfies FolderTreeProps["data"],
    "folders",
    { onClick: ({ path }) => explorerPathEmittor.setState(path) },
);
