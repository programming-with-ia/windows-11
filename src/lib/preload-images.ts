const seen = new Set<string>();

export function prefetchImages(sources: string[]) {
    sources.forEach(src => {
        if (seen.has(src)) {
            return;
        }
        const img = new Image();
        seen.add(src);
        img.src = src;
    });
}
