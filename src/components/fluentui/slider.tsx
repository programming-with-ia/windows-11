import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
// import type { IntRange } from "type-fest";

type SliderProps = {
    min?: number;
    max?: number;
    initialValue?: number;
    onValueChange?: (value: number) => void;
    onProgressChange?: (percentage: number) => void;
    value?: number;
} & Omit<React.ComponentPropsWithoutRef<"input">, "min" | "max">;

export default function Slider({
    initialValue = 10,
    min = 0,
    max = 100,
    className,
    onChange,
    onValueChange,
    onProgressChange,
    value: userValue,
}: SliderProps) {
    const [value, setValue] = useState(initialValue);
    const relValue = userValue ?? value;
    const percentage = useRef((relValue - min) / (max - min));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        if (userValue != undefined) return;
        const newValue = Number(e.target.value);
        setValue(newValue);
    };

    useEffect(() => {
        onValueChange?.(relValue);
        percentage.current = (relValue - min) / (max - min);
        onProgressChange?.(percentage.current);
    }, [relValue]);

    return (
        <input
            type="range"
            min={min}
            max={max}
            value={userValue ?? value}
            onProgress={(e) => console.log(e.currentTarget.value)}
            style={{ "--slider-progress": `${percentage.current}%` }}
            onChange={handleChange}
            className={cn("fluent-slider outline-none", className)}
        />
    );
}
