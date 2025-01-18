import { cx } from "class-variance-authority";
import { type ClassValue } from "clsx";
import { clsx as clsxLite } from "clsx/lite";
import React from "react";
import { twMerge } from "tailwind-merge";

export function orUndef<T>(value: T): NonFalsy<T> | undefined {
    return (value as NonFalsy<T>) || undefined;
}

export function toAttr(value: unknown) {
    return value ? "" : undefined;
}

export function cn(...inputs: ClassValue[]) {
    return orUndef(twMerge(cx(inputs)));
}
export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = !IS_SERVER;

export function doubleClick(elementId: string) {
    return document.getElementById(elementId)?.dispatchEvent(
        new MouseEvent("dblclick", {
            bubbles: true,
            cancelable: true,
            view: window,
        }),
    );
}

export function getDialogTriggerElement<T = HTMLButtonElement>(
    e: React.MouseEvent,
) {
    return document.querySelector(
        `[aria-controls="${e.currentTarget.closest('[role="dialog"]')?.id}"]`,
    ) as T | null;
}

export function focusElement(elementId: string) {
    document.getElementById(elementId)?.focus();
}

export { cx as clsx, twMerge, clsxLite };

export function joinPath(...strings: string[]): string {
    return strings
        .map((str) => str.replace(/^\\+|\\+$/g, ""))
        .filter((str) => str)
        .join("\\");
}

export function adjustArrayLength<T>(arr: T[], length: number): T[] {
    if (arr.length > length) {
        return arr.slice(0, length);
    } else {
        // return Array(Math.ceil(length / arr.length))
        // .fill(arr)
        // .flat()
        // .slice(0, length);
        const result: T[] = [];
        let i = 0;
        while (result.length < length) {
            result.push(arr[i % arr.length]!);
            i++;
        }
        return result;
    }
}

export function setWindow(key: string, value: any){
    if (typeof window == "undefined") return
    (window as any)[key] = value
}

export function getTranslateValues(transform: string) {
    const df = { x: 0, y: 0 };

    // If no transform is applied, return default values
    if (!transform || transform === "none") {
        return df;
    }

    // Check for `translateX` and `translateY` separately
    const translateXMatch = /translateX\((-?\d+\.?\d*)px\)/.exec(transform);
    const translateYMatch = /translateY\((-?\d+\.?\d*)px\)/.exec(transform);

    // Extract values and parse as numbers
    const x = translateXMatch ? parseFloat(translateXMatch[1]!) : df.x;
    const y = translateYMatch ? parseFloat(translateYMatch[1]!) : df.y;

    // Handle the case where transform is directly `translate(...)`
    const translate = /translate\(([^)]+)\)/.exec(transform);
    if (translate) {
        const values = translate[1]
            ?.split(/,\s*/)
            .map((value) => parseFloat(value));

        return {
            x: values?.[0] ?? x,
            y: values?.[1] ?? y,
        };
    }

    // Return extracted or default values
    return { x, y };
}