import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0071ff", // Cor base para o gradiente, usada em textos ou bordas
      },
      backgroundImage: {
        'primary-gradient': "radial-gradient(circle at 50% 100%, #e0f7ff, #a0dbff, #5db3ff, #2691ff, #0071ff, #0059d7, #003fa0, #002877)",
        'secondary-gradient': "radial-gradient(circle at 50% 100%, #f7ff0a, #ffd000, #ffa026, #ff7144, #f9455b, #d71c6d, #ab0478, #77107b);",
      },
    },
  },
  plugins: [],
} satisfies Config;
