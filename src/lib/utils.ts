import { cx } from "class-variance-authority";
import { type ClassValue } from "clsx";
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
    document.getElementById(elementId)?.dispatchEvent(
        new MouseEvent("dblclick", {
            bubbles: true,
            cancelable: true,
            view: window,
        }),
    );
}

export function focusElement(elementId: string) {
    document.getElementById(elementId)?.focus();
}
export const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
};

export { cx as clsx, twMerge };
