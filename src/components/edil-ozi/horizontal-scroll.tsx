import React, { type FC, useRef, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

type Props = {
    childLength?: number;
} & React.ComponentProps<"div">;

const HorizontalScrollCarousel: FC<Props> = ({ children, childLength }) => {
    const targetRef = useRef<HTMLDivElement>(null); // Target element for scroll tracking
    const containerRef = useRef<HTMLElement | null>(null); // Container for the scroll

    // Set the container dynamically after mounting
    useEffect(() => {
        const element = document.querySelector(
            "#projects>[data-win-viewport]",
        ) as HTMLElement | null;
        if (element) {
            containerRef.current = element;
        } else {
            console.warn(`Container element not found.`);
        }
    }, []);

    // Set up useScroll
    const { scrollYProgress } = useScroll({
        target: targetRef,
        container: containerRef, // Use the RefObject
    });

    // Map scrollYProgress to horizontal translation
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

    return (
        <section
            ref={targetRef}
            className="relative w-full"
            style={{
                height: `${(childLength ?? React.Children.count(children)) * 100}vh`,
            }}
        >
            <div className="sticky top-44 flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex h-full gap-4">
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

export default HorizontalScrollCarousel;
