import type * as CSS from "csstype";

declare module "csstype" {
    interface Properties {
        // Allow any CSS Custom Properties
        [index: `--${string}`]: any;
        [index: string]: any;
    }
}
