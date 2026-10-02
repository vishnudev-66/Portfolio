/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#05070A',
          900: '#0A0E14',
          800: '#0F141B',
          700: '#161C25',
          600: '#212A36',
          500: '#324152',
        },
        signal: {
          teal: '#4FD8C4',
          amber: '#F0A94D',
          red: '#E0563F',
        },
        ink: {
          100: '#EDF1F5',
          300: '#B7C2CE',
          500: '#7C8A98',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79,216,196,0.15), 0 0 24px -4px rgba(79,216,196,0.25)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 6s linear infinite',
      },
    },
  },
  plugins: [],
}
