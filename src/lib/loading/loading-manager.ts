import { createEmittor } from "emittor";
import { setWindow } from "../utils";

export const loadingEmittor = createEmittor({
    manualLoading: false,
    pageLoading: false,
});

setWindow("loadingEmittor", loadingEmittor);

export const loadingManager = {
    emittor: loadingEmittor,
    setManualLoading: (loading: boolean) => {
        loadingEmittor.setMatchState({
            ...loadingEmittor.state,
            ...{ manualLoading: loading },
        });
    },
    setPageLoading: (loading: boolean) => {
        loadingEmittor.setMatchState({
            ...loadingEmittor.state,
            ...{ pageLoading: loading },
        });
    },
    isLoading: () =>
        loadingEmittor.state.manualLoading || loadingEmittor.state.pageLoading,
} as const;
