import useOnlineStatus from "@/hooks/useOnline";
import SegoeIcon, { type SegoeIconsType } from "@/components/segoe-ui-icon";
import { useBattery } from "@/hooks/useBattery";
import clsx from "clsx";
import { clsxLite, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { IntRange, ValueOf } from "type-fest";
import { taskbarBtnCNs } from "./button";
import Slider from "../fluentui/slider";
import { transform } from "framer-motion";
import { useLocalStorageState } from "@/hooks/useLocalStorage";
import { SettingUse, useSetting } from "@/lib/Setting/useSetting";
import { FluentSettingStore } from "@/lib/Setting/SettingStore";

const QuickSettingBtnTypes = {
    normal: 0,
    menu: 1, // split btn with > icon
    layout: 2, // with > icon
} as const;

function QuickSettingsBtn({
    Type = QuickSettingBtnTypes.normal,
    icon,
    label,
    onCheckedChange,
    checked,
    onClick,
    className,
    ...p
}: {
    Type?: ValueOf<typeof QuickSettingBtnTypes>;
    icon: SegoeIconsType;
    label: React.ReactNode;
    checked?: boolean | undefined;
    onCheckedChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Pick<
    React.ComponentProps<"button">,
    "onClick" | "className" | "id" | "title" | "aria-label"
>) {
    const commonCns = "px-2 relative";
    const isSplitType = Type == QuickSettingBtnTypes.menu;
    const isNormalType = Type == QuickSettingBtnTypes.normal;
    const HideCheckBox = (
        <input
            type="checkbox"
            checked={checked}
            onChange={onCheckedChange}
            className="absolute inset-0 z-10 opacity-0"
        />
    );
    return (
        <div
            className="flex size-fit flex-col items-center gap-1.5 text-[12px]"
            {...p}
        >
            <button
                tabIndex={isSplitType || isNormalType ? -1 : undefined}
                // data-split={orUndef(isSplitType)}
                // role="checkbox"
                // aria-checked
                onClick={(e) => {
                    onClick?.(e);
                }}
                className={clsx(
                    "quickSettingBtn flex h-12 w-[95px] cursor-default items-center justify-center overflow-hidden rounded-md border border-foreground/10 text-base",
                    !isSplitType && clsxLite(commonCns, "font-segoe-icon"),
                    className,
                )}
            >
                <SegoeIcon
                    As={isNormalType ? 0 : "span"}
                    className={clsx(
                        "self-stretch",
                        isSplitType &&
                            clsxLite(commonCns, "splitBtn basis-1/2"),
                    )}
                    icon={icon}
                >
                    {(isNormalType || isSplitType) && HideCheckBox}
                </SegoeIcon>
                {!isNormalType && (
                    <SegoeIcon
                        className={clsx(
                            "self-stretch",
                            isSplitType
                                ? clsxLite(
                                      commonCns,
                                      "splitBtn basis-1/2 border-l border-foreground/10 text-sm",
                                  )
                                : "ml-1 text-[13px]",
                        )}
                        icon="Chevron Right"
                        onClick={(e) => {
                            isSplitType && e.stopPropagation();
                        }}
                    />
                )}
            </button>
            {label}
        </div>
    );
}

function QuickThemeSepiaToggle() {
    const [isSepiaEnable, setSepiaEnable] = useSetting<boolean>(
        "setting.theme.sepia",
    );
    // if (typeof window != "undefined") {
    //     document.body.setAttribute("data-sepia", String(isSepiaEnable));
    // }
    console.log("QuickThemeSepiaToggle", "sepia", isSepiaEnable);
    return (
        <QuickSettingsBtn
            label="Night light"
            icon="Blue Light"
            checked={!!isSepiaEnable}
            onCheckedChange={() => setSepiaEnable(!isSepiaEnable)}
        />
    );
}

export function SystemTrayOptions(
    p: Omit<React.ComponentProps<typeof SegoeIcon>, "icon">,
) {
    const online = useOnlineStatus();
    const { supported, charging, level } = useBattery();
    const BatterySaver = false;
    const BatteryIcon =
        `${charging ? "Mob Battery Charging" : BatterySaver ? "Mob Battery Saver" : "Mob Battery"} ${Math.round(level! * 10) as IntRange<0, 11>}` as const;

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className={clsx(
                            "items-center justify-center gap-2.5 rounded-md px-2.5 py-1",
                            taskbarBtnCNs,
                        )}
                    >
                        <SegoeIcon
                            {...p}
                            icon={
                                online
                                    ? supported
                                        ? "Wifi"
                                        : "Ethernet"
                                    : supported
                                      ? "Wifi Error 4"
                                      : "Ethernet Error"
                            }
                        />
                        <SegoeIcon icon="Volume" />
                        {supported && <SegoeIcon icon={BatteryIcon} />}
                    </button>
                </DialogTrigger>
                <DialogContent
                    className="bottom-[3.75rem] right-3 w-[360px] overflow-hidden p-0 font-segoe-ui-display text-foreground/90 !duration-200"
                    side={"bottom"}
                    align={"right"}
                    from={"bottom"}
                >
                    <div className="grid grid-cols-3 place-items-center justify-center gap-x-3 gap-y-4 p-6">
                        {supported && (
                            <>
                                <QuickSettingsBtn
                                    label="Wifi"
                                    icon="Wifi"
                                    Type={QuickSettingBtnTypes.menu}
                                />
                                <QuickSettingsBtn
                                    label="Bluetooth"
                                    icon="Bluetooth"
                                    Type={QuickSettingBtnTypes.menu}
                                />
                                <QuickSettingsBtn
                                    label="Mobile hotspot"
                                    icon="Internet Sharing"
                                />
                            </>
                        )}
                        <QuickSettingsBtn
                            label="Accessibility"
                            icon="Ease Of Access"
                            Type={QuickSettingBtnTypes.layout}
                        />
                        <QuickSettingsBtn
                            label="Airplane mode"
                            icon="Airplane"
                        />
                        <QuickSettingsBtn
                            label="Project"
                            icon="Project"
                            Type={QuickSettingBtnTypes.layout}
                        />

                        <QuickThemeSepiaToggle />
                        <QuickSettingsBtn
                            label={
                                <span>
                                    Theme (
                                    <span className="hidden dark:inline">
                                        dark
                                    </span>
                                    <span className="dark:hidden">light</span>)
                                </span>
                            }
                            // className="!bg-primary"
                            checked
                            icon="Light" // Quiet Hours U+E708
                            onClick={() =>
                                window.nextTheme.setTheme(
                                    window.nextTheme.theme == "dark"
                                        ? "light"
                                        : "dark",
                                )
                            }
                        />
                        <div className="col-span-3 mt-3 grid gap-y-7 place-self-stretch self-stretch">
                            <div className="inline-flex items-center gap-4">
                                <SegoeIcon icon="Brightness" />
                                <Slider
                                    initialValue={100}
                                    min={30}
                                    max={100}
                                    onChange={(e) => {
                                        FluentSettingStore.set(
                                            "setting.low-brightness",
                                            1 -
                                                Number(e.currentTarget.value) /
                                                    100,
                                        );
                                    }}
                                    className="w-full flex-1 basis-full"
                                />

                                <SegoeIcon
                                    className="opacity-0"
                                    icon="Lower Brightness"
                                />
                            </div>
                            <div className="inline-flex items-center gap-4">
                                <SegoeIcon icon="Volume 3" />
                                <Slider
                                    initialValue={80}
                                    className="w-full flex-1 basis-full"
                                />
                                <SegoeIcon icon="Mix Volumes" />
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-background/50 p-1 dark:bg-black/20">
                        {supported && (
                            <div
                                className={cn(
                                    taskbarBtnCNs,
                                    "items-center gap-1 rounded-md px-3 py-2 text-[13px] font-light",
                                )}
                            >
                                <SegoeIcon
                                    icon={BatteryIcon}
                                    className="text-base"
                                />
                                {Math.round(level! * 100)}%
                            </div>
                        )}
                        <SegoeIcon
                            className={clsxLite(
                                taskbarBtnCNs,
                                "ml-auto rounded-md px-3 py-2 text-sm",
                            )}
                            icon="Edit"
                        />
                        <SegoeIcon
                            className={clsxLite(
                                taskbarBtnCNs,
                                "rounded-md px-3 py-2 text-sm",
                            )}
                            icon="Setting"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
