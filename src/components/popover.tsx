//! useResize hook to reMount component when resize
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import {
    AnimatePresence,
    motion,
    type Variant,
    type Variants,
} from "framer-motion";
import useElement from "@/hooks/useElement";

function Popover({
    className,
    children,
    isOpen = false,
    onClickOutside,
    anchor,
    ...p
}: React.ComponentProps<typeof motion.div> & {
    isOpen: boolean;
    onClickOutside?: (event: MouseEvent | TouchEvent | FocusEvent) => void;
    anchor?: {
        target?: React.RefObject<HTMLElement | null> | undefined; // undefined for
        side?: "top" | "right" | "bottom" | "left";
        align?: "right" | "left" | "center";
        sideOffset?: number;
    }; // Used to align at the target element
}) {
    const Ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(
        Ref,
        onClickOutside ??
            (() => {
                0;
            }),
    );
    const ViewPort = useElement("viewport", "id");
    let variants: Record<"open" | "exit", Variant> = {
        exit: { opacity: 0 },
        open: { opacity: 1 },
    };
    const {
        target,
        side = "bottom",
        align = "center",
        sideOffset = 4,
    } = anchor ?? {};

    if (anchor?.target) {
        // align with target element
        const anchorClientRect =
            anchor?.target?.current?.getBoundingClientRect();

        let x: string | number | undefined = undefined;
        // let y: string | number | undefined = undefined;
        let othersVariant: Variant = {};
        if (anchorClientRect) {
            console.log(anchorClientRect.y + sideOffset);
            if (side == "top") {
                othersVariant = {
                    top: anchorClientRect.top - sideOffset,
                    left: anchorClientRect.left + anchorClientRect.width / 2,
                    y: "-100%",
                    ...othersVariant,
                };
            }
            if (align == "center") {
                x = "-50%";
                othersVariant = { x: "-50%", ...othersVariant };
            }
        }
        variants = {
            open: { ...variants.open, ...othersVariant },
            exit: { ...variants.exit, ...othersVariant },
        };
    } else {
        // align in windows like a tosts
        let exit_y: string | number = 0;
        let x: string | number | undefined = undefined;
        let othersVariant: Variant = {};

        if (side == "bottom") {
            exit_y = "100%";
        }
        if (align == "center") {
            x = "-50%";
            othersVariant = { left: "50%" };
        }

        variants = {
            open: {
                ...variants.open,
                [side]: sideOffset,
                y: 0,
                x,
                ...othersVariant,
            },
            exit: {
                ...variants.exit,
                [side]: sideOffset,
                y: exit_y,
                x,
                ...othersVariant,
            },
        };
    }

    return (
        <>
            {ViewPort &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                ref={Ref}
                                initial={"exit"}
                                animate={isOpen ? "open" : "exit"}
                                exit={"exit"}
                                variants={variants}
                                data-popover
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    "absolute rounded-lg border border-foreground/5 bg-background/50 p-3 backdrop-blur-xl",
                                    className,
                                )}
                                {...p}
                            >
                                {children}
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    ViewPort,
                )}
        </>
    );
}

export default Popover;

// new from gpt
// import { useOnClickOutside } from "@/hooks/useOnClickOutside";
// import React, { useRef, useState } from "react";
// import useElement from "./useElement";
// import { cn } from "@/lib/utils";
// import { createPortal } from "react-dom";
// import { AnimatePresence, motion, Variant } from "framer-motion";

// type Anchor = {
//   target?: React.RefObject<HTMLElement | null>;
//   side?: "top" | "right" | "bottom" | "left";
//   align?: "right" | "left" | "center";
//   sideOffset?: number;
// };

// function Popover_({
//   className,
//   children,
//   isOpen = false,
//   onClickOutside,
//   anchor,
//   ...p
// }: React.ComponentProps<typeof motion.div> & {
//   isOpen: boolean;
//   onClickOutside?: (event: MouseEvent | TouchEvent | FocusEvent) => void;
//   anchor?: Anchor;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   useOnClickOutside(ref, onClickOutside ?? (() => {}));
//   const viewport = useElement("viewport", "id");

//   const { target, side = "bottom", align = "center", sideOffset = 4 } = anchor ?? {};

//   // Positioning logic based on target
//   const computeVariants = (): { [key: string]: Variant } => {
//     let variants: { [key in "open" | "exit"]: Variant } = {
//       exit: { opacity: 0 },
//       open: { opacity: 1 },
//     };

//     if (target?.current) {
//       const targetRect = target.current.getBoundingClientRect();
//       let x: string | number | undefined;
//       let y: string | number | undefined;
//       let transformX = "";
//       let transformY = "";

//       // Adjust for 'side' positioning
//       switch (side) {
//         case "top":
//           y = targetRect.top - sideOffset;
//           transformY = "-100%";
//           break;
//         case "right":
//           x = targetRect.right + sideOffset;
//           break;
//         case "bottom":
//           y = targetRect.bottom + sideOffset;
//           break;
//         case "left":
//           x = targetRect.left - sideOffset;
//           transformX = "-100%";
//           break;
//       }

//       // Adjust for 'align' positioning
//       switch (align) {
//         case "left":
//           x = x ?? targetRect.left;
//           break;
//         case "right":
//           x = x ?? targetRect.right;
//           transformX = "-100%";
//           break;
//         case "center":
//           x = x ?? targetRect.left + targetRect.width / 2;
//           transformX = "-50%";
//           break;
//       }

//       // Combine the final positioning and transform for the popover
//       variants = {
//         open: { ...variants.open, top: y, left: x, x: transformX, y: transformY },
//         exit: { ...variants.exit, top: y, left: x, x: transformX, y: transformY },
//       };
//     } else {
//       // Position relative to window (fallback)
//       variants = {
//         open: { ...variants.open, bottom: sideOffset, x: "-50%" },
//         exit: { ...variants.exit, bottom: sideOffset, x: "-50%" },
//       };
//     }

//     return variants;
//   };

//   const variants = computeVariants();

//   return (
//     <>
//       {viewport &&
//         createPortal(
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 ref={ref}
//                 initial="exit"
//                 animate="open"
//                 exit="exit"
//                 variants={variants}
//                 transition={{ duration: 0.3 }}
//                 className={cn(
//                   "rounded-lg border absolute border-foreground/5 bg-background/50 p-3 backdrop-blur-xl z-50",
//                   className
//                 )}
//                 {...p}
//               >
//                 {children}
//               </motion.div>
//             )}
//           </AnimatePresence>,
//           viewport
//         )}
//     </>
//   );
// }
