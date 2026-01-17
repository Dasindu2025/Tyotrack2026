import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(0.18 0.02 240)',
        foreground: 'oklch(0.95 0.01 240)',
        primary: {
          DEFAULT: 'oklch(0.65 0.22 260)',
          foreground: 'oklch(0.98 0.01 240)',
        },
        secondary: {
          DEFAULT: 'oklch(0.24 0.04 240)',
          foreground: 'oklch(0.85 0.02 240)',
        },
        accent: {
          DEFAULT: 'oklch(0.7 0.18 160)',
          foreground: 'oklch(0.1 0.02 160)',
        },
        success: 'oklch(0.72 0.16 145)',
        danger: 'oklch(0.62 0.19 25)',
        warning: 'oklch(0.84 0.15 85)',
        muted: 'oklch(0.45 0.02 240)',
        border: 'oklch(0.28 0.03 240)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '18px',
        '3xl': '24px',
      },
      boxShadow: {
        'premium': '0 12px 36px -12px oklch(0 0 0 / 0.4)',
        'glow': '0 0 20px -5px oklch(0.65 0.22 260 / 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
