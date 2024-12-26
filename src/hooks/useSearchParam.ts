import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useSearchParam(key: string, Default: string) {
    const searchParams = useSearchParams();

    const value = useMemo(() => {
        const paramValue = searchParams.get(key);
        return paramValue ?? Default;
    }, [searchParams, key, Default]);

    const setSearchParam = useCallback(
        (value: string) => {
            if (typeof window !== "undefined") {
                const url = new URL(window.location.toString());
                value
                    ? url.searchParams.set(key, value)
                    : url.searchParams.delete(key);
                window.history.pushState({}, "", url);
            }
        },
        [key],
    );

    return [value, setSearchParam] as const;
}
