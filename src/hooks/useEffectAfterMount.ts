import { useEffect, useRef } from "react";

export function useEffectAfterMount(
    effect: React.EffectCallback,
    deps?: React.DependencyList | undefined,
) {
    const isMounted = useRef(false);

    useEffect(() => {
        let cleanup: void | (() => void) = undefined;

        if (isMounted.current) {
            cleanup = effect();
        }

        isMounted.current = true;

        return cleanup;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
