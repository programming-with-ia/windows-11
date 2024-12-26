"use client";

import * as React from "react";
import { X } from "lucide-react";
import { clsx, cn, toAttr } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    pClassName?: string;
    toolBtns?: React.ReactNode;
    pStyle?: { "--no-focus-indicator-bg"?: string } & React.CSSProperties;
}

export interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    pClassName?: string;
}

export const inputClasses =
    /*clsx(*/ "flex h-full w-full outline-none rounded-md bg-transparent file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 fluent-input";

function InputWrapper({
    className,
    fluent = true,
    ...p
}: React.ComponentProps<"div"> & { fluent?: boolean }) {
    return (
        <div
            data-input-wrapper
            {...p}
            className={cn(
                "inline-flex items-center justify-center gap-1 overflow-hidden rounded-md border py-1 text-sm shadow-sm transition-colors [&>*:first-child]:pl-3 [&>*:only-child]:!px-3",
                fluent && "focus-indicator",
                className,
            )}
        />
    );
}
export const InputButtonCNs =
    "inline-flex py-[3px] h-fit items-center justify-center rounded-sm bg-transparent px-2 text-foreground/60 hover:bg-foreground/10 active:opacity-80";

export const InputButtonVisibility = {
    onEmpty: "only-empty",
    onText: "only-text",
    onFocus: "only-focus",
};

export function InputButton({
    className,
    icon,
    tabIndex,
    ...p
}: Omit<React.ComponentProps<"button">, "children"> & {
    icon: React.ReactNode;
}) {
    return (
        <button
            tabIndex={tabIndex ?? -1}
            {...p}
            className={cn(InputButtonCNs, className)}
        >
            {/* <AsChild className="size-4"> */}
            {icon}
            {/* </AsChild> */}
        </button>
    );
}

export function getCurrentInput(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent,
) {
    return e.currentTarget
        .closest("[data-input-wrapper]")
        ?.querySelector("input") as HTMLInputElement | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, children, pClassName, pStyle, type, toolBtns, ...props },
        ref,
    ) => {
        return (
            <InputWrapper
                style={pStyle}
                fluent={type !== "file"}
                className={"h-[34px] " + pClassName}
            >
                <input
                    type={type}
                    className={clsx(inputClasses, className)}
                    ref={ref}
                    {...props}
                />
                {toolBtns}
                {children}
            </InputWrapper>
        );
    },
);
Input.displayName = "Input";

const FluentInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ children, ...p }, ref) => {
        const innerRef = React.useRef<HTMLInputElement>(null);

        React.useImperativeHandle(ref, () => innerRef.current!);

        const clear = () => {
            if (innerRef.current) {
                innerRef.current.value = "";
                innerRef.current.focus();
            }
        };

        return (
            <Input ref={innerRef} {...p}>
                {true && ( // children
                    <div className="inline-flex gap-1 pr-1">
                        <InputButton onClick={clear} icon={<X />} />
                        <InputButton icon={<X />} />
                        {children}
                    </div>
                )}
            </Input>
        );
    },
);

FluentInput.displayName = "FluentInput";

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, pClassName, ...props }, ref) => {
        return (
            <InputWrapper className={pClassName} data-fluent>
                <textarea
                    className={clsx(inputClasses, className)}
                    ref={ref}
                    {...props}
                />
            </InputWrapper>
        );
    },
);
TextArea.displayName = "TextArea";

export { Input, TextArea, FluentInput };
