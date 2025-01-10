import { createEmittor } from "emittor";
import type {  } from "./explorer";
import { doubleClick, joinPath } from "@/lib/utils";

export const CommonPaths = {
    user: joinPath("This PC", "Local Disk (C:)", "Users", "Admin"),
    pc: "This PC",
} as const;

export const explorerPathEmittor = createEmittor<string | undefined>(
    CommonPaths.pc,
);

export function openExplorer(path: string) {
    explorerPathEmittor.setState(path);
    doubleClick("explorer-desktop-item");
}
