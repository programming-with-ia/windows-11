type Falsy = false | 0 | "" | null | undefined | typeof NaN;
type NonFalsy<T> = T extends Falsy ? never : T;

interface Window {
    nextTheme: { theme: string; setTheme: (theme: string) => void };
}
