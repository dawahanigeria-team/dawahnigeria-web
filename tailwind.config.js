module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dncolor: {
          500: "#ddff2b",
        },
        border: "hsl(var(--border))",
        auth: "hsl(var(--auth))",
        input: "hsl(var(--input))",
        hover: "hsl(var(--hover))",
        comment: "hsl(var(--comment))",
        footer: "hsl(var(--footer))",
        ring: "hsl(var(--ring))",
        search: "hsl(var(--search))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        text: {
          DEFAULT: "hsl(var(--text))",
          foreground: "hsl(var(--text-foreground))",
          primary: "hsl(var(--text-primary))",
        },
      },
    },
  },
  plugins: [],
};
