/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        waffle: {
          night: "#6b3e26",
          cocoa: "#8a4f3d",
          crust: "#d98b2b",
          beige: "#f6d7b0",
          cream: "#fff3e8",
          frosting: "#ffd6e5",
          honey: "#f4b942",
          strawberry: "#ff7bac",
          blueberry: "#d94a6a",
          sky: "#f5a9c2",
          mint: "#fff8f3"
        }
      },
      boxShadow: {
        cartoon: "0 12px 0 rgba(107, 62, 38, 0.5), 0 26px 70px rgba(107, 62, 38, 0.24)",
        bubble: "0 0 0 2px rgba(255, 255, 255, 0.16), 0 18px 54px rgba(255, 123, 172, 0.24)",
        soft: "0 20px 70px rgba(107, 62, 38, 0.18)"
      },
      backgroundImage: {
        "cartoon-sky": "radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.65), transparent 12%), radial-gradient(circle at 82% 16%, rgba(255, 123, 172, 0.32), transparent 16%), radial-gradient(circle at 50% 0%, rgba(244, 185, 66, 0.3), transparent 30%), linear-gradient(180deg, #f5a9c2 0%, #ffd6e5 44%, #fff3e8 100%)",
        "cartoon-panel": "linear-gradient(135deg, rgba(255, 243, 232, 0.75), rgba(255, 214, 229, 0.38))",
        "waffle-glow": "linear-gradient(135deg, rgba(255, 123, 172, 0.96), rgba(244, 185, 66, 0.9), rgba(217, 74, 106, 0.95))"
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