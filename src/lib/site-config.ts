export const url = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"; // ?? // * Production URL
// process.env.NEXT_PUBLIC_VERCEL_URL ?? // * Vercel Auto URL
// "http://localhost:3000"; // * Dev

export const siteConfig = {
    name: "Windows 11",
    id: "windows-11",
    keywords: [
        "react",
        "html",
        "ui/ux",
        "nextjs",
        "reactjs",
        "tailwindcss",
        "animation",
        "tailwindcss-animate",
        "framer-motion",
        "javascript",
        "portfolio",
        "typescript",
        "next-themes",
        "motion",
    ],
    color: "#0078d4",

    description:
        "A sleek Windows 11 clone built with React, Next.js, Tailwind CSS, ShadCN, and Framer-Motion, featuring smooth animations, draggable windows, and a modern design system.",
    repo: "https://github.com/programming-with-ia/windows-11",
    url: url,
    authors: {
        name: "immi",
        url: "",
        twitter: "https://x.com/o_immi",
        email: "iafullprogrammer@gmail.com",
        github: "https://github.com/programming-with-ia",
    },
    //   images: [
    //     {
    //         url: "src-1200x630.png",
    //         width: 1200,
    //         height: 630,
    //     },
    //     {
    //         url: "src-1024x512.png",
    //         width: 1024,
    //         height: 512,
    //     },
    //     {
    //         url: "src-512x512.png",
    //         width: 512,
    //         height: 512,
    //     },
    //   ]
};
siteConfig.authors.url = siteConfig.authors.github;
