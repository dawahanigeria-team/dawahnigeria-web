module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      'mobile': {'max': '615px'},
      'mobile-up': '615px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
      
        color: {
          DEFAULT: "hsl(var(--color))",
          foreground: "hsl(var(--color-foreground))",
          primary: "hsl(var(--color-primary))",
        },
      },
    },
  },
  plugins: [],
};
