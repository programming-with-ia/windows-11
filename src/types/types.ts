import type {
    Dispatch,
    JSXElementConstructor,
    SetStateAction,
    JSX,
} from "react";

export type CompoProps<
    T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : React.ComponentProps<T>;

export type useStateAction<T> = Dispatch<SetStateAction<T>>;
