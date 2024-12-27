import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
type ThisPCItemProps = {
    icon: string;
    label?: string;
} & React.ComponentProps<"button">;
// & Omit<
// React.ComponentProps<"button">,
// "children"
// >

function ThisPCItemBase({
    icon,
    children,
    label,
    className,
    ...p
}: ThisPCItemProps) {
    return (
        <button
            className={cn(
                "inline-flex min-w-64 gap-1.5 rounded-[1px] border border-transparent px-1 py-0.5 text-[13px] outline-none focus-within:border-foreground/30 focus-within:bg-foreground/10 hover:bg-foreground/10",
                className,
            )}
            {...p}
        >
            <img
                className="aspect-square h-12 self-center object-contain"
                src={icon}
                alt={label + " icon"}
            />
            {label}
            {children}
        </button>
    );
}

function ThisPcDriveItem({
    label,
    fill,
    space,
    ...props
}: Omit<ThisPCItemProps, "childern"> & { fill: string; space: string }) {
    return (
        <ThisPCItemBase {...props}>
            <div className="flex flex-1 flex-col text-start leading-5">
                <span>{label}</span>
                <span className="h-3.5 w-full bg-[#e6e6e6] p-[1px]">
                    <span
                        className="block h-full"
                        style={{ width: fill, backgroundColor: "#26a0da" }}
                    />
                </span>
                <span className="text-foreground/60">{space}</span>
            </div>
        </ThisPCItemBase>
    );
}

function ThisPcFolderItem(props: Omit<ThisPCItemProps, "childern">) {
    return <ThisPCItemBase {...props} />;
}

const FoldersItems = [
    { icon: "/icons/folder-desktop.png", label: "Desktop" },
    // { icon: "/icons/folder-documents.png", label: "Documents" },
    // { icon: "/icons/folder-downloads.png", label: "Downloads" },
    { icon: "/icons/folder-music.png", label: "Music" },
    { icon: "/icons/folder-pictures.png", label: "Pictures" },
    { icon: "/icons/folder-videos.png", label: "Videos" },
];

function ThisPC() {
    return (
        <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2", "item-3"]}
            className="w-full"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Folders</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-1">
                    {FoldersItems.map((item, idx) => (
                        <ThisPcFolderItem
                            key={idx}
                            label={item.label}
                            icon={item.icon}
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Devices and drives</AccordionTrigger>
                <AccordionContent>
                    <ThisPcDriveItem
                        fill="58.7%"
                        space="408.1 GB free of 988 GB"
                        label="Local Disk (C:)"
                        icon="/icons/windows-drive.png"
                    />
                    <ThisPcDriveItem
                        fill="73.7%"
                        space="498.8 GB free of 1895 GB"
                        label="Local Disk (D:)"
                        icon="/icons/drive.png"
                    />
                    <ThisPcDriveItem
                        fill="24.1%"
                        space="2816.7 GB free of 3712 GB"
                        label="Local Disk (E:)"
                        icon="/icons/drive.png"
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ThisPC;
