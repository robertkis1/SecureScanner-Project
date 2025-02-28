/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1b1e',
          100: '#2C2D31',
          200: '#25262b',
          300: '#1e1f23',
          400: '#18191c',
        },
        light: {
          DEFAULT: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
        },
        neon: {
          blue: {
            light: '#60a5fa',
            DEFAULT: '#00f2fe',
            dark: '#0099ff'
          },
          purple: {
            light: '#a78bfa',
            DEFAULT: '#8e2de2',
            dark: '#5a1b9a'
          },
          pink: {
            light: '#f472b6',
            DEFAULT: '#ff1493',
            dark: '#c71585'
          },
          green: {
            light: '#4ade80',
            DEFAULT: '#00ff9d',
            dark: '#00cc7a'
          }
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'light-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'light': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'light-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'light-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    {
      pattern: /bg-(blue|indigo|purple|green|orange|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(blue|indigo|purple|green|orange|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
};