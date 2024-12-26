import { taskbarBtnClick } from "@/components/desktop/desktop-item";
import { focusElement } from "@/lib/utils";
import { type Dispatch, type SetStateAction, useState } from "react";

export function useWinState(winId: string | undefined, initialState = false) {
    const [isWinShow, setIsWinShow] = useState(initialState);

    const setIsWinShowHandler = (value: boolean) => {
        if (winId && isWinShow && value) {
            taskbarBtnClick(winId);
            // focusElement(winId!); // already window is shown and set focus
        } else setIsWinShow(value);
    };

    return [isWinShow, setIsWinShowHandler] as const;
}
