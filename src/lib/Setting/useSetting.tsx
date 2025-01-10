"use client";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useCallback, useEffect, useState } from "react";
import { FluentSettingStore, type StoreKeys } from "./SettingStore";
import { Slot } from "@radix-ui/react-slot";

type SettingKeys = StoreKeys<typeof FluentSettingStore>;

export function useSetting<T>(
    key: SettingKeys,
): [T | null | undefined, (v: T) => void] {
    const [value, setValue] = useState<T | undefined | null>(null);
    console.log(key, value);
    useEffect(() => {
        const setter = (v: T) => setValue(v);

        setValue(FluentSettingStore.get(key));

        FluentSettingStore.addListener(key, setter);
        return () => FluentSettingStore.removeListener(key, setter);
    }, [key]);

    const customSetValue = useCallback(
        (v: T) => FluentSettingStore.set(key, v),
        [key],
    );

    return [value, customSetValue];
}


//!  not working as expected
export function SettingUse<T>({
    children,
    key,
    updateProp,
    fixer = (v) => v,
}: {
    children: React.ReactNode;
    key: SettingKeys;
    updateProp: string;
    fixer?: (v: T) => T;
}) {
    const [value, _] = useSetting(key);
    const props = { [updateProp]: fixer(value as T) };
    console.log(props, value);
    FluentSettingStore.addListener(key, console.log);
    return <Slot {...props}>{children}</Slot>;
}
