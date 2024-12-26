type Falsy = false | 0 | "" | null | undefined | typeof NaN;
type NonFalsy<T> = T extends Falsy ? never : T;
