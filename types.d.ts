type Falsy = false | 0 | "" | null | undefined | typeof NaN;
type NonFalsy<T> = T extends Falsy ? never : T;

interface Window {
    nextTheme: { theme: string; setTheme: (theme: string) => void };
}

type ImgBtnProps = {
    label: string;
    src: string;
    onClick?: React.ComponentProps<"button">["onClick"];
};

type ImgLnkProps = {
    href: string;
} & Pick<ImgBtnProps, "label" | "src">;
