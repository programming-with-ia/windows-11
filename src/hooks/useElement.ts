import { useEffect, useRef, useState } from "react";

type SelectorType =
    | "id"
    // | "className"
    // | "tagName"
    // | "name"
    // | "tagNameNS"
    | "querySelect";

function useElement<T extends HTMLElement>(
    value: string,
    by: SelectorType = "id",
): T | null {
    const [element, setElement] = useState<T | null>(null);
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        let foundElement: T | null = null;

        switch (by) {
            case "id":
                foundElement = document.getElementById(value) as T | null;
                break;
            // case "className":
            //     foundElement = document.getElementsByClassName(
            //         value,
            //     )[0] as T | null;
            //     break;
            // case "tagName":
            //     foundElement = document.getElementsByTagName(
            //         value,
            //     )[0] as T | null;
            //     break;
            // case "name":
            //     foundElement = document.getElementsByName(value)[0] as T | null;
            //     break;
            // case "tagNameNS":
            //     foundElement = document.getElementsByTagNameNS(
            //         "*",
            //         value,
            //     )[0] as T | null;
            //     break;
            case "querySelect":
                foundElement = document.querySelector(value) as T | null;
                break;
            default:
                console.warn(`Unsupported selector type: ${by}`);
        }

        // setElement(foundElement);
        elementRef.current = foundElement;
    }, [by, value]);

    return elementRef.current;
}

export default useElement;
