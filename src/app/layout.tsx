import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import React, { Suspense } from "react";
import { ProgressBar } from "@lexz451/next-nprogress";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import "@/styles/globals.css";
import { roboto, SegoeUIDisplayFont, SegoIconFont } from "@/font";
import { LoadingHelper } from "@/lib/loading/loading-comps";
import { ThemeHelper } from "@/hooks/useTheme";
import SettingInit from "@/lib/Setting/setting-init";
import { siteConfig } from "@/lib/site-config";
import { routes } from "@/lib/routes-map";
let ShadcnThemeEditor: any;
if (process.env.NODE_ENV === "development") {
    import("shadcn-theme-editor").then((module) => {
        ShadcnThemeEditor = module.default; // or module, depending on the module's export
    });
} else {
    // eslint-disable-next-line react/display-name
    ShadcnThemeEditor = () => null;
}

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: siteConfig.authors,
    generator: siteConfig.authors.name,
    keywords: siteConfig.keywords,
    alternates: {
        types: {
            "text/html": [
                { url: new URL(routes.desktop, siteConfig.url), title: "Home" },
                {
                    url: new URL(routes.lock, siteConfig.url),
                    title: "Lock Screen",
                },
                { url: siteConfig.repo, title: "Source Code (Github)" },
            ],
        },
    },
    twitter: {
        title: siteConfig.name,
        description: siteConfig.description,
        creator: "@o_immi",
        creatorId: "1813232551131291651",
    },
    // https://i.ibb.co/Jk7gMHT/bg-dark.jpg
};

export const viewport: Viewport = {
    themeColor: siteConfig.color,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <Body>
                <>{children}</>
            </Body>
        </html>
    );
}

function Body({ children }: { children: React.ReactNode }) {
    return (
        <body
            className={`!pointer-events-auto fixed flex h-screen w-screen flex-col overflow-hidden ${roboto.className} ${SegoIconFont.variable} ${SegoeUIDisplayFont.variable}`}
            // style={{fontFamily: roboto.style.fontFamily}}
        >
            <Suspense fallback={<>Loading.............</>}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Suspense fallback={true}>
                        <ProgressBar
                            color="#333"
                            height="2px"
                            options={{
                                showSpinner: false,
                            }}
                        />
                        <LoadingHelper />
                    </Suspense>
                    {children}
                    <ShadcnThemeEditor />
                    <TailwindIndicator />
                    <ThemeHelper />
                    <SettingInit />
                </ThemeProvider>
                <button id="button" className="size-0 opacity-0" />
            </Suspense>
        </body>
    );
}
