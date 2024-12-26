import { isSignedIn as isSignedInEmittor } from "@/lib/emittors";
import { routes } from "@/lib/routes-map";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useIsSignedIn() {
    const router = useRouter();
    const [IsSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        isSignedInEmittor.state
            ? setIsSignedIn(true)
            : router.push(routes.lock);

        // return () => { //! Uncommenting this block causes a bug to occur
        //     isSignedInEmittor.setState(false);
        // };
    }, []);

    return IsSignedIn;
}
