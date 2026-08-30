import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        paper: "hsl(var(--paper))",
        surface: "hsl(var(--surface))",
        "surface-strong": "hsl(var(--surface-strong))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          secondary: "hsl(var(--ink-secondary))",
          muted: "hsl(var(--ink-muted))",
        },
        rule: {
          DEFAULT: "hsl(var(--rule))",
          strong: "hsl(var(--rule-strong))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          ink: "hsl(var(--accent-ink))",
        },
        live: "hsl(var(--live))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "2px",
        lg: "8px",
      },
      fontSize: {
        // Display scale. Tight leading and negative tracking are baked in so a
        // heading never needs three utility classes to look right.
        "display-sm": ["clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.024em" }],
        "display-md": ["clamp(2.25rem, 1.6rem + 2.9vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.028em" }],
        "display-lg": ["clamp(2.75rem, 1.7rem + 4.4vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.032em" }],
      },
      maxWidth: {
        frame: "78rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
