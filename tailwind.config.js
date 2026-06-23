/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#000000',
        'obsidian': '#0a0a0a',
        'obsidian-light': '#111111',
        'surface': '#161616',
        'surface-raised': '#1e1e1e',
        'gold': '#D4A843',
        'gold-light': '#F0C872',
        'gold-dim': '#8a6a22',
        'white-pure': '#FFFFFF',
        'grey-muted': '#666666',
        'grey-subtle': '#333333',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 67, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(212, 168, 67, 0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
