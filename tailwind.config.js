/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/site/pages/**/*.{ts,tsx}",
    "./src/site/widgets/**/*.{ts,tsx}",
    "./src/site/features/**/*.{ts,tsx}",
    "./src/site/entities/**/*.{ts,tsx}",
    "./src/site/shared/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#070607",
        soot: "#111013",
        iron: "#262126",
        ash: "#463a34",
        rust: "#8b3b2f",
        blood: "#5b1615",
        oldgold: "#8b7550",
        bone: "#ded2bf",
        deadcyan: "#6d8f8f"
      },
      boxShadow: {
        shrine:
          "0 0 0 1px rgba(222,210,191,0.08), 0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 60px rgba(139,59,47,0.10)",
        glyph: "0 0 40px rgba(139,117,80,0.18), 0 0 16px rgba(109,143,143,0.10)"
      },
      keyframes: {
        veilIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(18px) scale(0.985)",
            filter: "blur(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)"
          }
        },
        quietPulse: {
          "0%, 100%": {
            opacity: "0.5",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "0.9",
            transform: "scale(1.018)"
          }
        },
        slowSpin: {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        },
        smokeDrift: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)"
          },
          "50%": {
            transform: "translate3d(-1.5%, 2%, 0) scale(1.035)"
          }
        },
        lineReveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(8px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        cursorBlink: {
          "0%, 45%": {
            opacity: "0"
          },
          "46%, 100%": {
            opacity: "1"
          }
        },
        gateClose: {
          "0%": {
            opacity: "0",
            transform: "scale(1.08)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        }
      },
      animation: {
        "veil-in": "veilIn 1.1s cubic-bezier(0.18, 1, 0.36, 1) both",
        "quiet-pulse": "quietPulse 6s ease-in-out infinite",
        "slow-spin": "slowSpin 22s linear infinite",
        "smoke-drift": "smokeDrift 18s ease-in-out infinite",
        "line-reveal": "lineReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "cursor-blink": "cursorBlink 1.4s steps(2, end) infinite",
        "gate-close": "gateClose 0.95s cubic-bezier(0.4, 0, 0.2, 1) both"
      }
    }
  },
  plugins: []
};
