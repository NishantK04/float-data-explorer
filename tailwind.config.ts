import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          dark: "hsl(var(--secondary-dark))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "wave": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "wave-1": {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" }
        },
        "wave-2": {
          "0%, 100%": { transform: "translateX(100%)" },
          "50%": { transform: "translateX(-100%)" }
        },
        "wave-3": {
          "0%, 100%": { transform: "translateX(-50%)" },
          "50%": { transform: "translateX(150%)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" }
        },
        "jellyfish": {
          "0%": { transform: "translateX(-100px) translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateX(100vw) translateY(-100px) rotate(360deg)", opacity: "0" }
        },
        "fish": {
          "0%": { transform: "translateX(-100px) translateY(50vh) scaleX(1)" },
          "45%": { transform: "translateX(50vw) translateY(30vh) scaleX(1)" },
          "55%": { transform: "translateX(50vw) translateY(70vh) scaleX(-1)" },
          "100%": { transform: "translateX(100vw) translateY(50vh) scaleX(-1)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        "slide-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" }
        },
        "bubble": {
          "0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(-20vh) scale(1.2)", opacity: "0" }
        },
        "bubble-random": {
          "0%": { transform: "translateY(100vh) translateX(0px) scale(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "50%": { transform: "translateY(50vh) translateX(50px) scale(1)" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-20vh) translateX(-30px) scale(0.8)", opacity: "0" }
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary))" },
          "50%": { boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))" }
        },
        "neon-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "75%": { opacity: "1" },
          "85%": { opacity: "0.9" }
        },
        "ocean-flow": {
          "0%, 100%": { transform: "translateX(-50%) translateY(0px)", opacity: "0.3" },
          "50%": { transform: "translateX(-50%) translateY(-20px)", opacity: "0.7" }
        },
        "depth-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "70%": { boxShadow: "0 0 0 20px hsl(var(--primary) / 0)" }
        },
        "underwater": {
          "0%": { filter: "brightness(0.8) blur(2px)", transform: "scale(0.95)" },
          "50%": { filter: "brightness(1.1) blur(0px)", transform: "scale(1.02)" },
          "100%": { filter: "brightness(0.8) blur(2px)", transform: "scale(0.95)" }
        },
        "soundwave": {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(2)" }
        },
        "glass-shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wave": "wave 6s ease-in-out infinite",
        "wave-1": "wave-1 20s linear infinite",
        "wave-2": "wave-2 25s linear infinite reverse",
        "wave-3": "wave-3 30s linear infinite",
        "float": "float 8s ease-in-out infinite",
        "jellyfish": "jellyfish 45s linear infinite",
        "fish": "fish 35s linear infinite",
        "fade-up": "fade-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "slide-out": "slide-out 0.5s ease-out",
        "bubble": "bubble 15s infinite linear",
        "bubble-random": "bubble-random 18s infinite linear",
        "ripple": "ripple 2s infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "neon-flicker": "neon-flicker 3s ease-in-out infinite",
        "ocean-flow": "ocean-flow 8s ease-in-out infinite",
        "depth-pulse": "depth-pulse 3s infinite",
        "underwater": "underwater 6s ease-in-out infinite",
        "soundwave": "soundwave 0.8s ease-in-out infinite",
        "glass-shimmer": "glass-shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
