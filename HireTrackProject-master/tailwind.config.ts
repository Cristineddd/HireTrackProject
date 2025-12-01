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
        primary: {
          DEFAULT: '#2B75EE',
          50: '#E8F1FE',
          100: '#D1E3FD',
          200: '#A3C7FB',
          300: '#75ABF9',
          400: '#5390F3',
          500: '#2B75EE',
          600: '#1F5DD3',
          700: '#1546A0',
          800: '#0E2F6C',
          900: '#061738',
        },
        secondary: {
          DEFAULT: '#BAC4CE',
          50: '#F7F8FA',
          100: '#EFF1F4',
          200: '#DFE3E9',
          300: '#CFD5DE',
          400: '#C4CCD6',
          500: '#BAC4CE',
          600: '#95A0AF',
          700: '#6F7C90',
          800: '#4B5761',
          900: '#262D33',
        },
        accent: {
          DEFAULT: '#22C365',
          50: '#E7F9EF',
          100: '#CFF3DF',
          200: '#9FE7BF',
          300: '#6FDB9F',
          400: '#49CF82',
          500: '#22C365',
          600: '#1A9C51',
          700: '#13753D',
          800: '#0D4E28',
          900: '#062714',
        },
        foreground: {
          DEFAULT: '#1D2530',
        },
        background: {
          DEFAULT: '#F9FAFB',
        },
      },
    },
  },
  plugins: [],
};

export default config;
