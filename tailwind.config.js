/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display: dramatic, editorial weight for headings
        display: ["'Playfair Display', Georgia, serif"],
        // Body: clean, modern, readable
        body: ["'DM Sans', system-ui, sans-serif"],
        // Mono: for code / tech labels
        mono: ["'JetBrains Mono', 'Fira Code', monospace"],
      },
      colors: {
        // Accent palette: deep electric blue + warm amber
        accent: {
          DEFAULT: '#3b82f6', // blue-500
          dim: '#2563eb',     // blue-600
          glow: '#60a5fa',    // blue-400
        },
        amber: {
          DEFAULT: '#f59e0b', // amber-500
          dim: '#d97706',     // amber-600
        },
        // Surface tokens (dark)
        surface: {
          dark: '#0f1117',
          card: '#161821',
          cardHover: '#1e2130',
          border: '#2a2d3a',
        },
        // Surface tokens (light)
        surfaceLight: {
          base: '#f4f5f7',
          card: '#ffffff',
          cardHover: '#f0f2f5',
          border: '#e2e5ec',
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'gradient-card-border': 'linear-gradient(135deg, #3b82f6, #8b5cf6, #f59e0b)',
      },
      animation: {
        'blob-1': 'blobFloat1 18s ease-in-out infinite',
        'blob-2': 'blobFloat2 22s ease-in-out infinite',
        'blob-3': 'blobFloat3 26s ease-in-out infinite',
        'progress-fill': 'progressFill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'chip-pop': 'chipPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
      keyframes: {
        blobFloat1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(60px, -40px) scale(1.08)' },
          '66%':      { transform: 'translate(-30px, 50px) scale(0.95)' },
        },
        blobFloat2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%':      { transform: 'translate(-70px, 30px) scale(1.05)' },
          '70%':      { transform: 'translate(40px, -60px) scale(0.97)' },
        },
        blobFloat3: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%':      { transform: 'translate(50px, 40px) scale(1.1)' },
        },
        progressFill: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        chipPop: {
          from: { opacity: '0', transform: 'scale(0.7) translateY(8px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
