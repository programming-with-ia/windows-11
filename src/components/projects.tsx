/* eslint-disable @next/next/no-img-element */
import React from "react";
import HorizontalScrollCarousel from "./edil-ozi/horizontal-scroll";

export const projectsData = [
    {
        title: "Art Gale Studios",
        description:
            "A dynamic animation studio website built with React, Next.js, and Tailwind CSS, featuring engaging animations and SEO optimization.",
        tags: [
            "React",
            "TypeScript",
            "Next.js",
            "Tailwind",
            "framer-motion",
            "Shadcn",
            "svg morph",
            "flubber",
            "animation",
            "seo",
            "radix",
        ],
        imageUrl: "/projects/artgalestudios.jpg",
        link: "https://www.artgalestudios.com",
    },
    {
        title: "Shadcn Theme Editor",
        description: `Shadcn Theme Editor is a user-friendly component designed to simplify the process of managing and customizing theme colors in Shadcn-based projects.`,
        tags: ["React", "TypeScript", "Next.js", "Tailwind", "npm"],
        imageUrl: "/projects/artgalestudios.jpg",
        link: "https://www.artgalestudios.com",
        // imageUrl: "/images/portfolio.png",
        // link: 'https://github.com/bbyc4kes/portfolio',
    },
    {
        title: "Emittor",
        description: `The custom emittor approach for state management in React offers a convenient way to manage and share states across multiple components without the need to wrap them with providers.`,
        tags: [
            "React",
            "TypeScript",
            "Next.js",
            "OOP (Object Oriented Programming)",
            "hooks",
            "npm",
            "Javascript",
        ],
        // imageUrl: "/images/ai-lawyer.png",
        // link: 'mailto:azimov.worksace@gmail.com',
        imageUrl: "/projects/artgalestudios.jpg",
        link: "https://www.artgalestudios.com",
    },
    {
        title: "Chat App",
        description:
            "A real-time chat app with toast notifications, built using React, TypeScript, and Next.js. Features include encryption, Upstash and Redis integration, and Pusher for real-time updates.",
        tags: [
            "React",
            "TypeScript",
            "Next.js",
            "Shadcn",
            "Tailwind",
            "Upstash",
            "Redis",
            "encryption",
            "Next-Auth",
            "Pusher",
            "Zod",
            "react-hook-form",
            "axios",
            "radix",
        ],
        // imageUrl: "/images/surge.png",
        // link: 'https://github.com/bbyc4kes/surge',
        imageUrl: "/projects/artgalestudios.jpg",
        link: "https://www.artgalestudios.com",
    },
    {
        title: "Netflix Clone",
        description:
            "A Netflix clone built with React, TypeScript, and Next.js, featuring Tailwind CSS for design, Prisma and MongoDB for data management, and framer-motion for smooth animations.",
        tags: [
            "React",
            "TypeScript",
            "Next.js",
            "Tailwind",
            "Prisma",
            "axios",
            "bcrypt",
            "Next-Auth",
            "framer-motion",
            "swr",
            "zustand",
            "MongoDB",
            "react-player",
            "radix",
        ],
        imageUrl: "/projects/artgalestudios.jpg",
        link: "https://www.artgalestudios.com",
        // imageUrl: "/images/camp-with-us.png",
        // link: 'https://github.com/bbyc4kes/campwithus',
    },
    {
        title: "Spotify Clone",
        description:
            "A Spotify clone developed with React, TypeScript, and Next.js. Features include Tailwind CSS for styling, Radix for UI components, and Supabase for authentication and storage.",
        tags: [
            "React",
            "TypeScript",
            "Next.js",
            "Tailwind",
            "radix",
            "stripe",
            "supabase (auth & storage)",
            "react-hook-form",
            "zustand",
        ],
        imageUrl: "/projects/artgalestudios.jpg",
        link: "https://www.artgalestudios.com",
    },
] as const;

function Projects() {
    return (
        <>
            <div className="blur-mask-bottom fixed left-1/2 -z-[1] h-full w-[calc(100%-1.5*2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-foreground/10 border-b-transparent @container">
                <img
                    className="blur-mask-bottom absolute h-[30rem] w-full bg-[#d0d9e4] @3xl:h-[40rem] dark:bg-[#020b20]"
                    src="/background-3.png"
                    style={{ backgroundImage: "url('/background-3.png')" }}
                    alt="gb-img"
                />
                {/* <img className='absolute object-contain bottom-0 right-0 max-h-80 mix-blend-screen' src='/background-2.webp' alt='gb-img' /> */}
            </div>
            <div className="fixed inset-0 -z-50 h-full w-full bg-dot-white/10">
                {/* <img className='absolute inset-x-0 bottom-0 w-full max-h-80 mix-blend-lighten' src='/background-2.webp' alt='gb-img' /> */}
            </div>
            <div className="relative w-full pl-4 pt-12">
                <div className="fixed top-24 mb-12 grid grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-x-2 p-8 pl-4">
                    <img
                        className="row-span-2 size-16"
                        alt="Github-img"
                        src="/icons/projects.png"
                    />
                    <span className="self-end text-sm text-foreground/80">
                        immi&apos;s
                    </span>
                    <h2 className="self-start text-3xl font-semibold tracking-wider md:text-4xl">
                        Projects
                    </h2>
                </div>

                <HorizontalScrollCarousel>
                    {projectsData.map((project, idx) => (
                        <button
                            key={idx}
                            role="listitem"
                            className="min-h-96 w-[30rem] overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-md backdrop-brightness-75 hover:border-foreground/15 hover:bg-foreground/10"
                        >
                            <div>
                                <h3 className="mb-2 text-left text-2xl font-semibold md:text-3xl">
                                    {project.title}
                                </h3>
                                <p className="mb-6 text-left text-[.93rem] text-foreground/90">
                                    {project.description}
                                </p>
                                {project.tags && (
                                    <div
                                        role="list"
                                        className="flex flex-wrap justify-start gap-1"
                                    >
                                        {project.tags.map((tag, idx) => (
                                            <span
                                                className="text-nowrap rounded-full border border-foreground/10 bg-background/40 px-2 py-0.5 text-[13px] text-foreground/90"
                                                role="listitem"
                                                key={idx}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </HorizontalScrollCarousel>
            </div>
        </>
    );
}

export default Projects;
