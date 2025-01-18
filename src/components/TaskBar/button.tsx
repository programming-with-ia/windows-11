/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import { clsx, clsxLite, cn } from "@/lib/utils";
import { withDefaultProps } from "@/lib/withDefaultProps";
import React from "react";

export const taskbarBtnCNs =
    "taskbarBtn inline-flex cursor-default border border-transparent outline-none transition-colors duration-150";

interface TaskBarButtonProps extends React.ComponentProps<"button"> {
    src?: string;
    lightSrc?: string;
    imgClassName?: string;
    isActive?: boolean;
    children?: React.ReactNode;
}

const TaskBarButton = React.forwardRef<HTMLButtonElement, TaskBarButtonProps>(
    (
        {
            children,
            className,
            title,
            src,
            lightSrc,
            imgClassName,
            isActive,
            ...p
        },
        ref,
    ) => {

        const Img = withDefaultProps("img", {
            className: clsxLite(
                "pointer-events-none transition-transform duration-200 animate-in fade-in-0 zoom-in-0 group-active:scale-[.8]",
                imgClassName,
            ),
            width: 70,
            height: 70,
            alt: title ?? "image",
        });

        return (
            <button
                ref={ref}
                type="button"
                // aria-current={orUndef(isActive)}
                title={title}
                aria-label={title}
                // data-state={isActive ? "open" : undefined}
                data-taskbar-btn
                className={cn(
                    taskbarBtnCNs,
                    "group relative size-10 select-none justify-self-center rounded p-2 hover:bg-foreground/5",
                    className,
                )}
                {...p}
            >
                {src && (
                    <Img
                        className={lightSrc && "hidden dark:block"}
                        src={src}
                    />
                )}
                {lightSrc && <Img className="dark:hidden" src={lightSrc} />}
                {isActive !== undefined && (
                    <span
                        className={clsx(
                            "pointer-events-none absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full transition-all duration-200",
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
