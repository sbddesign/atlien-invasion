import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'fave-color-0': "hsl(0deg 100% 50%)",
        'fave-color-10': "hsl(10deg 100% 50%)",
        'fave-color-20': "hsl(20deg 100% 50%)",
        'fave-color-30': "hsl(30deg 100% 50%)",
        'fave-color-40': "hsl(40deg 100% 50%)",
        'fave-color-50': "hsl(50deg 100% 50%)",
        'fave-color-60': "hsl(60deg 100% 50%)",
        'fave-color-70': "hsl(70deg 100% 50%)",
        'fave-color-80': "hsl(80deg 100% 50%)",
        'fave-color-90': "hsl(90deg 100% 50%)",
        'fave-color-100': "hsl(100deg 100% 50%)",
        'fave-color-110': "hsl(110deg 100% 50%)",
        'fave-color-120': "hsl(120deg 100% 50%)",
        'fave-color-130': "hsl(130deg 100% 50%)",
        'fave-color-140': "hsl(140deg 100% 50%)",
        'fave-color-150': "hsl(150deg 100% 50%)",
        'fave-color-160': "hsl(160deg 100% 50%)",
        'fave-color-170': "hsl(170deg 100% 50%)",
        'fave-color-180': "hsl(180deg 100% 50%)",
        'fave-color-190': "hsl(190deg 100% 50%)",
        'fave-color-200': "hsl(200deg 100% 50%)",
        'fave-color-210': "hsl(210deg 100% 50%)",
        'fave-color-220': "hsl(220deg 100% 50%)",
        'fave-color-230': "hsl(230deg 100% 50%)",
        'fave-color-240': "hsl(240deg 100% 50%)",
        'fave-color-250': "hsl(250deg 100% 50%)",
        'fave-color-260': "hsl(260deg 100% 50%)",
        'fave-color-270': "hsl(270deg 100% 50%)",
        'fave-color-280': "hsl(280deg 100% 50%)",
        'fave-color-290': "hsl(290deg 100% 50%)",
        'fave-color-300': "hsl(300deg 100% 50%)",
        'fave-color-310': "hsl(310deg 100% 50%)",
        'fave-color-320': "hsl(320deg 100% 50%)",
        'fave-color-330': "hsl(330deg 100% 50%)",
        'fave-color-340': "hsl(340deg 100% 50%)",
        'fave-color-350': "hsl(350deg 100% 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
