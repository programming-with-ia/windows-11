import { useState, useEffect } from "react";

export default function useOnlineStatus() {
    const [online, setOnline] = useState<boolean>(true);

    useEffect(() => {
        setOnline(navigator.onLine);

        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return online;
}
