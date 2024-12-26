"use client";

import React, { useRef, useState } from "react";
import TaskBarSearchIcon from "./search-icon";
import { motion } from "framer-motion";
import clsx from "clsx";

function TaskbarSearch() {
    const [isCurrentActive, setIsActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");
    const isActive = isCurrentActive || !!value;

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            className="inline-flex cursor-text items-center gap-2 rounded-full border-b border-foreground/10 bg-foreground/10 px-3.5 py-1.5 focus-within:ring-1"
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
        >
            {React.useMemo(
                () => (
                    <TaskBarSearchIcon
                        className={clsx(
                            "size-4 transition-opacity duration-100",
                            !isActive && "opacity-60",
                        )}
                        active={isActive}
                    />
                ),
                [isActive],
            )}
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={inputRef}
                placeholder="Search"
                className="flex-1 bg-transparent text-sm text-foreground/90 !outline-none !ring-0 placeholder:text-muted-foreground"
                type="text"
            />
        </div>
    );
}

export default TaskbarSearch;
