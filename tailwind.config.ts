import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        petal: "#fbe8ef",
        mint: "#eafaf1",
        lavender: "#f3ecff",
        ink: "#2c2940"
      },
      boxShadow: {
        soft: "0 10px 30px -14px rgba(40, 22, 72, 0.22)"
      },
      backgroundImage: {
        "pastel-wash": "radial-gradient(circle at 10% 10%, #fef3f7 0%, transparent 42%), radial-gradient(circle at 85% 15%, #edf9f1 0%, transparent 38%), radial-gradient(circle at 50% 95%, #f2ecff 0%, transparent 45%)"
      }
    }
  },
  plugins: []
};

export default config;
