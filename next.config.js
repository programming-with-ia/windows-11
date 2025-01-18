/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const routes = {
    desktop: "/",
    lock: "/lock-screen",
};

/** @type {import("next").NextConfig} */
const config = {
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        reactCompiler: true,
    },
    async redirects() {
        return [
            {
                source: routes.desktop,
                destination: routes.lock,
                permanent: false,
                missing: [
                    {
                        type: "query",
                        key: "authorized",
                        value: "true",
                    },
                    //     {
                    //         type: "cookie",
                    //         key: "authorized",
                    //         value: "true",
                    //     },
                ],
            },
        ];
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: "https",
    //             hostname: "github.com",
    //             pathname: "/programming-with-ia/windows-11/**",
    //             search: ""
    //         }
    //     ]
    // }
};

export default config;
