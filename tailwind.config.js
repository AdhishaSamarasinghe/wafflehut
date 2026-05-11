/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        waffle: {
          night: "#1b1024",
          cocoa: "#5b341c",
          crust: "#8f5427",
          beige: "#f5e1c8",
          cream: "#fff4cf",
          frosting: "#fff8fb",
          honey: "#ffb347",
          strawberry: "#ff6b8a",
          blueberry: "#7d6cff",
          sky: "#7cd6ff",
          mint: "#85f4d2"
        }
      },
      boxShadow: {
        cartoon: "0 10px 0 rgba(63, 34, 13, 0.72), 0 24px 64px rgba(0, 0, 0, 0.32)",
        bubble: "0 0 0 2px rgba(255, 255, 255, 0.14), 0 18px 50px rgba(255, 107, 138, 0.22)",
        soft: "0 20px 70px rgba(0, 0, 0, 0.25)"
      },
      backgroundImage: {
        "cartoon-sky": "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.22), transparent 12%), radial-gradient(circle at 80% 18%, rgba(125, 108, 255, 0.28), transparent 16%), radial-gradient(circle at 50% 0%, rgba(255, 179, 71, 0.26), transparent 28%), linear-gradient(180deg, #2a1737 0%, #1b1024 45%, #130c1a 100%)",
        "cartoon-panel": "linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04))",
        "waffle-glow": "linear-gradient(135deg, rgba(255, 179, 71, 0.96), rgba(255, 107, 138, 0.75), rgba(125, 108, 255, 0.9))"
      },
      fontFamily: {
        rounded: ["var(--font-rounded)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -16px, 0)" }
        },
        bob: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -8px, 0) scale(1.02)" }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-4deg)" },
          "40%": { transform: "rotate(4deg)" },
          "60%": { transform: "rotate(-3deg)" },
          "80%": { transform: "rotate(3deg)" }
        },
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        sparkle: {
          "0%, 100%": { transform: "scale(0.88) rotate(0deg)", opacity: "0.45" },
          "50%": { transform: "scale(1.18) rotate(20deg)", opacity: "1" }
        },
        syrup: {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "50%": { transform: "translateY(10px) scaleY(1.08)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        bob: "bob 4.5s ease-in-out infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
        pop: "pop 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        sparkle: "sparkle 3.4s ease-in-out infinite",
        syrup: "syrup 5.2s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};