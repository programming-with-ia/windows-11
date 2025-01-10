import debounce from "lodash.debounce";

interface Setting<T> {
    key: string;
    defaultValue: T;
    onChange?: (value: T) => void;
}

class SimpleStore<
    ST extends Setting<unknown>[],
    ST_Key extends string = ST[number]["key"],
> {
    protected settings: Map<string, unknown>;
    private listeners: Map<string, ((value: unknown) => void)[]>;

    constructor(settings: ST) {
        this.settings = new Map(
            settings.map(({ key, defaultValue }) => [key, defaultValue]),
        );
        this.listeners = new Map();

        settings.forEach(
            (setting) =>
                setting.onChange &&
                this.addListener(setting.key as ST_Key, setting.onChange),
        );
    }

    // Get the current value of a setting
    public get<T>(key: ST_Key): T | undefined {
        return this.settings.get(key) as T | undefined;
    }

    // Update a setting and trigger change events
    public set<T>(key: ST_Key, value: T): void {
        if (!this.settings.has(key)) {
            console.warn(`Key "${key}" is not registered in the settings.`);
            return;
        }

        this.settings.set(key, value);
        this.triggerListeners(key, value);
    }

    // Add a listener for a specific key
    public addListener<T>(key: ST_Key, callback: (value: T) => void): void {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }

        this.listeners.get(key)!.push(callback as (value: unknown) => void);
    }

    // Remove a listener for a specific key
    public removeListener<T>(key: ST_Key, callback: (value: T) => void): void {
        if (this.listeners.has(key)) {
            const filteredListeners = this.listeners
                .get(key)!
                .filter((cb) => cb !== callback);
            this.listeners.set(key, filteredListeners);
        }
    }

    // Trigger listeners for a specific key
    protected triggerListeners<T>(key: ST_Key, value: T): void {
        console.log("triggerListeners", key, value, this.listeners.get(key));
        if (this.listeners.has(key)) {
            this.listeners.get(key)!.forEach((callback) => callback(value));
        }
    }
}

class LocalStorageStore<
    ST extends Setting<unknown>[],
    ST_Key extends string = ST[number]["key"],
> extends SimpleStore<ST> {
    constructor(settings: ST) {
        super(settings);
        // this.initializeSettings(settings);
    }

    public initializeSettings(): void {
        this.settings.forEach((defaultValue, key) => {
            const storedValue = localStorage.getItem(key);
            const value =
                storedValue !== null ? JSON.parse(storedValue) : defaultValue;

            this.set(key as ST_Key, value, false);
        });
    }

    public set<T>(key: ST_Key, value: T, skipSave = false): void {
        super.set(key, value);
        if (!skipSave) {
            this.saveToLocalStorage(key, value);
        }
    }

    public saveToLocalStorage = debounce(
        (key: string, value: any) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        300,
        { maxWait: 2000 },
    );
}

export type StoreKeys<T> =
    T extends SimpleStore<infer ST, infer ST_Key> ? ST_Key : never;

export { SimpleStore, LocalStorageStore };

const Settings = [
    {
        defaultValue: false,
        key: "setting.theme.sepia",
        onChange: (isEnable) => {
            document.body.setAttribute("data-sepia", String(isEnable));
        },
    },
    {
        defaultValue: 0,
        key: "setting.low-brightness",
        onChange: (value) => {
            document.body.style.setProperty("--low-brightness", String(value));
        },
    },
] as const satisfies Setting<unknown>[];

// export type SettingKeys = (typeof Settings)[number]["key"];
export const FluentSettingStore = new LocalStorageStore(Settings);
