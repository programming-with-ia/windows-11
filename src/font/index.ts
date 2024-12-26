import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });
export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "700", "900", "300"],
});

export const SegoIconFont = localFont({
    src: "./Segoe-UI-Icons.ttf",
    variable: "--segoe-ui-icon",
    display: "swap",
    preload: true,
});

export const SegoeUIDisplayFont = localFont({
    src: "./segoe-ui-variable-display.ttf",
    variable: "--segoe-ui-variable-display",
    display: "swap",
    preload: true,
});
