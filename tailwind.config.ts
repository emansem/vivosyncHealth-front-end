import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary_color: "#198754",
        darrk_color: "#242634",
        white_color1: "#ccc",
        light_darkbg: "#2E303F",
        border_color: "#dadceo",
        primary_color: "#269c65",
        text_color2: " #78716c",
        red_color: " #ef4444",

        light_color: "#86ddb52a",
        text_color1: "#78716c"
      }, boxShadow: {
        shadow1: " rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        shadow2: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
        shadow3: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        shadow4: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
        shadow5: " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      }

    },
  },
  plugins: [],
};
export default config;
