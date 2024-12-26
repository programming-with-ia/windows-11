// immi: its not tested
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSearchParam() {
    const searchParams = useSearchParams();

    function getSearchParam(key: string, Default = "") {
        const value = searchParams.get(key);
        return value ?? Default;
    }

    const setSearchParam = useCallback((name: string, value: string) => {
        const url = new URL(window.location.toString());
        url.searchParams.set(name, value);
        window.history.pushState({}, "", url);
    }, []);

    return {
        getSearchParam,
        setSearchParam,
        searchParams,
    };
}
