/* eslint-disable prefer-const */
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const defaultTheme = require("tailwindcss/defaultTheme");
import plugin from "tailwindcss/plugin";
const { cva } = require("class-variance-authority");
const svgToDataUri = require("mini-svg-data-uri");
import type { ClassValue } from "class-variance-authority/types";
import { SetNonNullable } from "type-fest";

type ConfigSchema = Record<string, Record<string, ClassValue>>;

const colors = require("tailwindcss/colors");
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            opacity: {
                2: "0.02",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans],
                "segoe-icon": ["var(--segoe-ui-icon)"], //"'Segoe Fluent Icons'", 
                "segoe-ui-display": ["var(--segoe-ui-variable-display)"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            borderWidth: {
                3: "3px",
                5: "5px",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    hover: "hsl(var(--primary-hover))",
                    // hover: "#99ebff",
                    icon: "hsl(var(--primary-icon))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/container-queries"),
        require("tailwind-scrollbar"),
        require('tailwindcss-full-bleed'),
        plugin(function ({ addUtilities, addVariant, theme }) {
            addVariant("hocus", ["&:hover", "&:focus"]);
            addVariant("hocus-visible", ["&:hover", "&:focus-visible"]);
            addVariant("hocus-within", ["&:hover", "&:focus-within"]);
            addVariant("not-active", ["&:not(:active)"]);
        }),
        require('tailwindcss-elevation')(
            {
                color: "var(--elevation-shadow)"
            }
        ),
        function ({ addVariant, e }) {
            // input-types
            // Define the input types we want to support
            const inputTypes = [
                "text",
                "password",
                "email",
                "number",
                "checkbox",
                "radio",
                "file",
                "date",
                "tel",
                "search",
                "range",
            ];

            // For each input type, add a corresponding variant
            inputTypes.forEach((type) => {
                addVariant(
                    `input-${type}`,
                    ({ modifySelectors, separator }) => {
                        modifySelectors(({ className }) => {
                            // The class name format will be "input-type:class-name"
                            return `.${e(`input-${type}${separator}${className}`)}[type="${type}"]`;
                        });
                    },
                );
            });
        },
        function ({ matchUtilities, theme }: any) {
            matchUtilities(
                {
                    "bg-grid": (value: any) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
                        )}")`,
                    }),
                    "bg-grid-small": (value: any) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
                        )}")`,
                    }),
                    "bg-dot": (value: any) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
                        )}")`,
                    }),
                },
                {
                    values: flattenColorPalette(theme("backgroundColor")),
                    type: "color",
                },
            );
        },
        plugin(function ({ addComponents }) {
            // cva uncomplete
            const prefix = "btn";
            const configSchema: ConfigSchema = {
                variant: {
                    default: "bg-blue-500 text-white hover:bg-blue-600",
                    outline:
                        "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100",
                    ghost: "bg-transparent text-blue-500 hover:bg-blue-50",
                },
                size: {
                    sm: "px-3 py-1 text-sm",
                    md: "px-4 py-2 text-base",
                    lg: "px-6 py-3 text-lg",
                },
                rounded: {
                    none: "rounded-none",
                    sm: "rounded-sm",
                    lg: "rounded-lg",
                },
            };
            const buttonStyles = cva(
                "inline-flex items-center justify-center font-medium transition", // Base styles
                {
                    variants: configSchema,
                    defaultVariants: {
                        variant: "default",
                        size: "md",
                        rounded: "sm",
                    },
                },
            );
            function generateClassList(config: ConfigSchema, prefix = "cva") {
                const classList: string[] = [];
                Object.keys(config).forEach((key) => {
                    const subConfig = config[key]!;
                    Object.keys(subConfig).forEach((subKey) => {
                        classList.push(`${prefix}-${key}-${subKey}`);
                    });
                });
                return classList;
            }
            function generateClassObject(classList: string[]) {
                // Define the result type, with string keys and values as objects containing the 'myFunc' function
                const result: Parameters<typeof addComponents>["0"] = {};
                const getVariants = (value: string) =>
                    "bg-red-500 rounded-lg border";
                classList.forEach((className: string) => {
                    result[`.${className}`] = {
                        [`@apply ${getVariants(className)}`]: {},
                    };
                });

                return result;
            }
            const customClassesList = generateClassList(configSchema, prefix);
            addComponents(generateClassObject(customClassesList));
        }),

        // addUtilities(
        //     cvaExpose('myprefix', {
        //       'button': button_variants,
        //       'card': dialog_variants,
        //       ...
        //     })
        //   ); https://github.com/joe-bell/cva/discussions/146#discussioncomment-7848827
          
    ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
    );

    addBase({
        ":root": newVars,
    });
}
