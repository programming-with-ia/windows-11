import type {
    Dispatch,
    JSXElementConstructor,
    SetStateAction,
    JSX,
} from "react";
import type { ClassValue } from "class-variance-authority/types";

export type CompoProps<
    T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : React.ComponentProps<T>;

type CVAVariants = Record<string, ClassValue>;
type CVAConfigSchema = Record<string, CVAVariants>;
export type { CVAConfigSchema, ClassValue, CVAVariants };
export type useStateAction<T> = Dispatch<SetStateAction<T>>;
