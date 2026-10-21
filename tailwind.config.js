/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
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
      colors: {
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },
        surface: "var(--color-surface)",
        'text-primary': "var(--color-text-primary)",
        'text-secondary': "var(--color-text-secondary)",
        industrial: {
          DEFAULT: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'headline': ['Roboto Condensed', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'cta': ['Montserrat', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.3' }],
        'subheading': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'industrial': '3.5rem',
      },
      boxShadow: {
        'industrial': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'industrial-lg': '0 8px 24px rgba(52, 73, 94, 0.15)',
        'industrial-xl': '0 12px 32px rgba(52, 73, 94, 0.2)',
        'metallic': '0 4px 12px rgba(230, 126, 34, 0.3)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "counter": "counter 2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "rotate": "rotate 20s linear infinite",
        "galerie-fade": "galerie-fade 0.25s both",
        "galerie-pop": "galerie-pop 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
        "mcct-shine": "mcct-shine 2.8s infinite",
        "mcct-pulse": "mcct-pulse 3s infinite",
        "mcct-rise": "mcct-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "mcct-hero-zoom": "mcct-hero-zoom 1.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "mcct-load": "mcct-load 1.6s cubic-bezier(0.4, 0, 0.2, 1) both",
        "mcct-marquee": "mcct-marquee 46s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "counter": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "galerie-fade": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "galerie-pop": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "mcct-shine": {
          "0%": { left: "-60%" },
          "60%": { left: "130%" },
          "100%": { left: "130%" },
        },
        "mcct-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(36,120,190,.45)" },
          "50%": { boxShadow: "0 0 0 10px rgba(36,120,190,0)" },
        },
        "mcct-rise": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "mcct-hero-zoom": {
          from: { transform: "scale(1.08)" },
          to: { transform: "scale(1)" },
        },
        "mcct-load": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        // Défilement continu des avis : la piste contient deux copies de la
        // liste, translater de -50% ramène donc exactement au point de départ.
        "mcct-marquee": {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      transitionTimingFunction: {
        'industrial': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'industrial': '1px',
      },
      gridTemplateColumns: {
        'industrial': 'repeat(auto-fit, minmax(300px, 1fr))',
        'capabilities': 'repeat(auto-fit, minmax(250px, 1fr))',
        'testimonials': 'repeat(auto-fit, minmax(350px, 1fr))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}