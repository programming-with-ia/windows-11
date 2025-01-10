"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { loadingManager } from "./loading-manager";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useLoading from "./useLoading";

export function LoadingLink({
    children,
    onClick,
    href,
    ...p
}: React.ComponentPropsWithoutRef<typeof Link>) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={(e) => {
                onClick?.(e);
                loadingManager.setManualLoading(true);
            }}
            onMouseEnter={e=>router.prefetch(e.currentTarget.href)}
            {...p}
        >
            {children}
        </Link>
    );
}

export function LoadingHelper() {
    const isLoading = useLoading();
    const ATTR = "data-loading";
    // For ManualLoading
    const pathName = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log("setting... manualLoading: false");
        loadingManager.setManualLoading(false);
    }, [pathName, searchParams]);

    typeof document != "undefined" &&
        (isLoading
            ? document.body.setAttribute(ATTR, "1")
            : document.body.removeAttribute(ATTR));
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `body[${ATTR}="1"],body:has([${ATTR}="1"]){cursor: progress;}`,
            }}
        />
    );
}
