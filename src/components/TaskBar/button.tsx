/* eslint-disable jsx-a11y/role-supports-aria-props */
import { clsx, cn, orUndef } from "@/lib/utils";
import { useStateAction } from "@/types/types";
import Image from "next/image";
import React from "react";

interface TaskBarButtonProps extends React.ComponentProps<"button"> {
    src?: string;
    imgClassName?: string;
    isActive?: boolean;
    children?: React.ReactNode;
}

const TaskBarButton = React.forwardRef<HTMLButtonElement, TaskBarButtonProps>(
    (
        { children, className, title, src, imgClassName, isActive, ...p },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                type="button"
                aria-current={orUndef(isActive)}
                title={title}
                aria-label={title}
                data-taskbar-btn
                className={cn(
                    "group relative size-10 select-none justify-self-center rounded p-2 transition-colors duration-100 hover:bg-foreground/5 [&_*]:pointer-events-none",
                    isActive && "border border-border/50 bg-foreground/5",
                    className,
                )}
                {...p}
            >
                {src && (
                    <img
                        className={cn(
                            "transition-transform duration-200 animate-in fade-in-0 zoom-in-0 group-active:scale-[.8]",
                            imgClassName,
                        )}
                        src={src}
                        alt={title ?? "image"}
                        width={70}
                        height={70}
                    />
                )}
                {isActive !== undefined && (
                    <span
                        className={clsx(
                            "absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full transition-all duration-200",
                            isActive
                                ? "w-4 bg-primary"
                                : "w-1.5 bg-foreground/40",
                        )}
                    />
                )}
                {children}
            </button>
        );
    },
);

TaskBarButton.displayName = "TaskBarButton";

export default TaskBarButton;
