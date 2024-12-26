import { useEffect, useState } from "react";
import { loadingManager } from "./loading-manager";

export default function useLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const setter = (state: typeof loadingManager.emittor.state) => {
        setIsLoading(state.manualLoading || state.pageLoading);
    };
    useEffect(() => {
        loadingManager.emittor.connect(setter);

        return () => loadingManager.emittor.disconnect(setter);
    }, []);

    return isLoading;
}
