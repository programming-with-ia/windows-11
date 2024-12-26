import { useEffect, useLayoutEffect, useState } from "react";

export function useIsClient() {
    const [isClient, setClient] = useState(false);

    useLayoutEffect(() => {
        setClient(true);
    }, []);

    return isClient;
}
