import { createEmittor } from "emittor";
import type React from "react";
import type { explorerTabsType } from "./explorer";

export const explorerTabEmittor = createEmittor<explorerTabsType | undefined>(
    undefined,
);
