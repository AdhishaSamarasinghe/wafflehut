/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505",
          ember: "#1b110d",
          cocoa: "#2b1a12",
          gold: "#d7b46a",
          cream: "#f6efe6"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(215, 180, 106, 0.22), 0 30px 80px rgba(0, 0, 0, 0.45)",
        soft: "0 20px 80px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "luxury-radial": "radial-gradient(circle at top, rgba(215, 180, 106, 0.18), transparent 36%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08), transparent 22%), linear-gradient(180deg, #090705 0%, #050505 50%, #020202 100%)",
        "gold-sheen": "linear-gradient(135deg, rgba(215, 180, 106, 0.95), rgba(255, 236, 185, 0.62), rgba(106, 71, 20, 0.95))"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -16px, 0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};