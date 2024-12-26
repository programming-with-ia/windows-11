import { useRef } from "react";

export default function usePrevious<T>(value: T) {
    const currentRef = useRef<T>(value);
    const previousRef = useRef<T | undefined>(undefined);

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }

    return previousRef.current;
}
