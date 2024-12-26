"use client";
import { useEffect } from "react";
import { loadingManager } from "./loading-manager";

export default function Loading() {
    console.log("page loading...");

    useEffect(() => {
        console.log("setting... pageLoading true");
        loadingManager.setPageLoading(true);
        return () => {
            console.log("setting... pageLoading false");
            loadingManager.setPageLoading(false);
        };
    }, []);
    return null;
}
