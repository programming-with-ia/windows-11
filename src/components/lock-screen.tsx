"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import LockImage from "../../public/lock-space.jpg";
import useTime from "@/hooks/useTime";
import { format } from "date-fns/format";
import SegoeIcon from "./segoe-ui-icon";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import type { ValueOf } from "type-fest";
import clsx from "clsx";
import { type LenisRef, ReactLenis, useLenis } from "lenis/react";
import { useIsClient } from "@/hooks/useIsClient";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { withDefaultProps } from "@/lib/withDefaultProps";
import {
    getCurrentInput,
    Input,
    InputButton,
    InputButtonCNs,
    InputButtonVisibility,
} from "./fluentui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { isSignedIn } from "@/lib/emittors";
import { routes } from "@/lib/routes-map";
import Link from "next/link";
import { loadingManager } from "@/lib/loading/loading-manager";
import { prefetchImages } from "@/lib/preload-images";
import { DesktopIcons } from "@/lib/images";

const lockScreenStatus = {
    normal: "0",
    password: "1",
} as const;

const variants = {
    [lockScreenStatus.normal]: { y: 0 },
    [lockScreenStatus.password]: { y: "-100%", opacity: 0 },
} as const satisfies Variants;

const MotionImage = motion.create(Image);

function percentageDiff(orgValue: number, newValue: number) {
    const difference = Math.abs(orgValue - newValue);
    return difference / orgValue;
}

const LockToolButton = withDefaultProps(SegoeIcon, {
    className:
        "inline-flex aspect-square h-10 items-center gap-1.5 rounded-md px-3 text-lg transition-colors hover:bg-foreground/10",
    As: "button",
});

function LockScreen() {
    // const [screenStatus, setScreenStatus] = useState<
    //     ValueOf<typeof lockScreenStatus>
    // >(lockScreenStatus.normal);
    // const isPasswordScreen = screenStatus == lockScreenStatus.password;

    const screenState = useRef<ValueOf<typeof lockScreenStatus>>(
        lockScreenStatus.normal,
    );

    const lenisRef = useRef<LenisRef>(null);
    // const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: { current: lenisRef.current?.wrapper ?? null },
    });

    const [isMount, setIsMount] = useState(false);
    const router = useRouter();

    // Dragging
    const draggingRef = useRef(false);
    const startYRef = useRef(0);
    const initialScrollYRef = useRef(0);

    // Scroll Animation
    const imgScale = useTransform(scrollYProgress, [0.1, 1], [1, 1.2]);
    const imgBlur = useTransform(scrollYProgress, [0.1, 1], [0, 12]);
    const timeLayerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // for lockscreen time layer
    const passwordLayerOpacity = useTransform(
        scrollYProgress,
        [0.8, 1],
        [0, 1],
    );
    const passwordLayerScale = useTransform(
        scrollYProgress,
        [0.8, 1],
        [0.97, 1],
    );

    const validatePassword = () => {
        console.log("redirect to home");
        isSignedIn.setState(true);
        loadingManager.setManualLoading(true);
        router.push("/");
    };

    // Scroll Helpers
    const scrollToBottom = () => {
        screenState.current = lockScreenStatus.password;
        lenisRef.current?.wrapper?.classList.add("active-passwordScreen");
        lenisRef.current?.lenis?.scrollTo(
            lenisRef.current.wrapper?.scrollHeight ?? 0,
            { duration: 0.2, lock: true, onComplete: (e) => e.stop() },
        );
    };

    const scrollToTop = () => {
        if (lenisRef.current?.lenis?.isStopped) {
            lenisRef.current.lenis.start();
        }
        screenState.current = lockScreenStatus.normal;
        lenisRef.current?.wrapper?.classList.remove("active-passwordScreen");
        lenisRef.current?.lenis?.scrollTo(0, { duration: 0.2, lock: true });
    };

    const debounceScrollToTop = useDebounceCallback(scrollToTop, 100);

    // Dragging
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (screenState.current == lockScreenStatus.password) return;
        console.log("Pointer Down");
        draggingRef.current = true;
        startYRef.current = e.clientY;
        initialScrollYRef.current = lenisRef.current?.wrapper?.scrollTop ?? 0;
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (draggingRef.current) {
            const deltaY = e.clientY - startYRef.current;
            const scrollBy = -(initialScrollYRef.current + deltaY); // remove Math.abs()
            if (scrollBy < 0) return;
            lenisRef.current?.lenis?.scrollTo(scrollBy);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;

        draggingRef.current = false;
        percentageDiff(
            window.innerHeight,
            lenisRef.current?.wrapper?.scrollTop ?? 0,
        ) < 0.8
            ? scrollToBottom()
            : scrollToTop();
    };

    // Main useEffect
    useEffect(() => {
        setIsMount(true);
        if (!isMount) return;
        router.prefetch(routes.desktop);
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                scrollToTop();
            } else if (e.key == " ") {
                if (screenState.current != lockScreenStatus.password)
                    e.preventDefault();
                scrollToBottom();
            }
        };
        const handleScroll = (e: Event) => {
            if (draggingRef.current) return;
            // if (screenState.current == lockScreenStatus.password) {
            //     console.log("ignore scroll")
            //     e.preventDefault();
            //     e.stopPropagation();
            // }
            // lenisRef.current?.wrapper?.scrollTop == lenisRef.current?.wrapper?.scrollHeight-lenisRef.current?.wrapper?.clientHeight
            percentageDiff(
                window.innerHeight,
                lenisRef.current?.wrapper?.scrollTop ?? 0,
            ) < 0.8
                ? scrollToBottom()
                : debounceScrollToTop();
        };
        // const handleWheel = (e: Event) => {
        //     if (screenState.current == lockScreenStatus.password) {
        //         e.preventDefault()
        //         e.stopPropagation()
        //     }
        // }
        const wrapper = lenisRef.current?.wrapper;
        window.addEventListener("keydown", handleKeyPress);
        wrapper?.addEventListener("scroll", handleScroll);
        // wrapper?.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            wrapper?.removeEventListener("scroll", handleScroll);
            // wrapper?.removeEventListener("wheel", handleWheel);
        };
    }, [isMount, debounceScrollToTop]);

    useEffect(() => {
        if (!isMount) return;

        const intervalId = setInterval(() => {
            console.log(document.readyState)
            if (document.readyState === "complete") {
                prefetchImages(Object.values(DesktopIcons));
                clearInterval(intervalId);
            }
        }, 250);

        return () => {
            clearInterval(intervalId);
        };
    }, [isMount]);

    return (
        <ReactLenis
            options={{ easing: (t) => t, duration: 0.1 }}
            root={false}
            ref={lenisRef}
            className="group/lock fixed inset-0 z-50 select-none overflow-y-scroll bg-white dark:bg-black"
            props={{
                onPointerDown: handlePointerDown,
                onPointerUp: handlePointerUp,
                onPointerMove: handlePointerMove,
                onDoubleClick: () => scrollToBottom(),
            }}
        >
            <Link
                prefetch
                href={routes.desktop}
                className="sr-only"
                aria-hidden
            >
                Desktop
            </Link>
            <MotionImage
                style={{
                    scale: imgScale,
                    filter: useMotionTemplate`blur(${imgBlur}px)`,
                }}
                src={LockImage}
                fill
                placeholder="blur"
                alt="lock-img"
                className={clsx("!fixed inset-0 -z-[1] object-cover")}
            />
            <motion.div
                style={{ opacity: timeLayerOpacity }}
                className="normalScreen relative grid h-screen" /* group-[.pointer-events-none]/lock:invisible */
            >
                <div className="flex h-screen flex-col">
                    <LockTime />
                    <div className="ml-auto mt-auto px-6 py-5">
                        <LockToolButton icon="Ethernet" />
                    </div>
                </div>
            </motion.div>
            <motion.div
                style={{
                    opacity: passwordLayerOpacity,
                    scale: passwordLayerScale,
                }}
                tabIndex={-1}
                className="passwordScreen sticky bottom-0 flex h-screen flex-col" // group-[:not(.pointer-events-none)]/lock:!pointer-events-none
            >
                <div className="flex flex-1 flex-col items-center justify-center gap-4 self-center justify-self-stretch">
                    <SegoeIcon
                        className="size-[1.65em] rounded-full bg-foreground/90 text-[7rem] text-background/50"
                        icon="Contact Solid"
                    />
                    <span className="text-2xl font-medium">immi</span>
                    <Input
                        type="password"
                        pClassName="mt-1 bg-background/50 w-72 border-b-0"
                        pStyle={{
                            "--no-focus-indicator-bg":
                                "hsl(var(--foreground) / .5)",
                        }}
                        className="[&:not(:placeholder-shown):not([type='text'])]:font-['Arial_Black']"
                        onKeyDown={(e) => {
                            e.key == "Enter" && validatePassword();
                        }}
                        placeholder="PIN"
                        toolBtns={
                            <div className="flex items-center pr-1">
                                <SegoeIcon
                                    tabIndex={-1}
                                    icon="Red Eye"
                                    As={"button"}
                                    className={cn(
                                        InputButtonCNs,
                                        "cursor-default text-xs",
                                        InputButtonVisibility.onText,
                                    )}
                                    onPointerDown={(e) => {
                                        const inputElement = getCurrentInput(e);
                                        if (!inputElement) return;
                                        inputElement.type = "text";
                                    }}
                                    onPointerUp={(e) => {
                                        const inputElement = getCurrentInput(e);
                                        if (!inputElement) return;
                                        inputElement.type = "password";
                                    }}
                                    onPointerLeave={(e) => {
                                        const inputElement = getCurrentInput(e);
                                        if (!inputElement) return;
                                        inputElement.type = "password";
                                    }}
                                />
                                <SegoeIcon
                                    tabIndex={-1}
                                    icon="Right Arrow Key Time 0"
                                    As={"button"}
                                    className={cn(
                                        InputButtonCNs,
                                        "cursor-default text-xs",
                                    )}
                                    onClick={() => validatePassword()}
                                />
                            </div>
                        }
                    />
                    <button className="text-sm opacity-70 transition-opacity duration-75 hover:opacity-100">
                        sign-in options
                    </button>
                </div>
                <div className="ml-auto mt-auto px-6 py-5">
                    <LockToolButton icon="Wifi" />
                    <LockToolButton icon="Ease Of Access" />
                    <LockToolButton icon="Power Button" />
                </div>
            </motion.div>
        </ReactLenis>
    );
}

function LockTime() {
    const time = useTime();
    return (
        <time
            dateTime={time.toString()}
            className="mt-[20vh] flex flex-col items-center gap-2 font-segoe-ui-display text-8xl font-medium"
        >
            {format(time, "h:mm")}
            <span className="text-lg">{format(time, "EEEE, MMMM dd")}</span>
        </time>
    );
}

export default LockScreen;
