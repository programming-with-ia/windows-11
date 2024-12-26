import { createEmittor } from "emittor";

export const loadingEmittor = createEmittor({
    manualLoading: false,
    pageLoading: false,
});

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
