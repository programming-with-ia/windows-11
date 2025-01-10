"use client";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import React, { useEffect } from "react";
import { FluentSettingStore } from "./SettingStore";
import { setWindow } from "../utils";

function SettingInit() {
    useEffect(() => {
        FluentSettingStore.initializeSettings();
        setWindow("fluentSettingStore", FluentSettingStore);
    }, []);

    return null;
}

export default SettingInit;
