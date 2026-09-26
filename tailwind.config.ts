/**
 * Tailwind Config – Vercel‑ready with design tokens
 * Extends the default theme with a comprehensive set of colors,
 * fonts, animations, backdrop‑blur, shadows, border‑radius, and typography.
 */
import type { Config } from '@tailwindcss/tailwind-config';

export default {
  // -------------------------------------------------
  // Theme
  // -------------------------------------------------
  content: ['@vite[tail]:',
    './app/globals.css',
    'src/**/*.{js,ts}'
  ],

  // -------------------------------------------------
  // Plugins
  // -------------------------------------------------
  plugins: [
    // Enable the typography plugin for fine‑grained font control
    require('./typography.ts')?.plugin,
    // Add custom CSS variables support
    require('@tailwindcss/formatter').plugin,
  ],

  // -------------------------------------------------
  // Color Palette
  // -------------------------------------------------
  theme: {
    extend: {
      // Primary brand colors
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#1e1b4b',
        },
        accent: {
          500: '#ec4899',
          600: '#f43f5e',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },
        background: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#f1f5f9',
          600: '#e2e8f0',
          700: '#f8fafc',
          800: '#ffffff',
        },
      },

      // Neutral tones for surfaces & borders
      neutral: {
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },

      // Accent variations
      accentVariants: {
        red: { 500: '#ef4444', 600: '#dc2626' },
        orange: { 500: '#f59e0b', 600: '#d97706' },
        green: { 500: '#10b981', 600: '#059669' },
        blue: { 500: '#3b82f6', 600: '#2563eb' },
      },
    },

    // -------------------------------------------------
    // Fonts
    // -------------------------------------------------
    fontFamily: {
      sans: 'Inter, "Segoe UI", Roboto, sans-serif',
      serif: '\`\`\`ui \`\`\`',
    },

    // -------------------------------------------------
    // Typography Scale
    // -------------------------------------------------
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
    },

    // -------------------------------------------------
    // Line Heights
    // -------------------------------------------------
    lineHeight: {
      'xs': 1.25,
      'sm': 1.35,
      'base': 1.5,
      'lg': 1.625,
      'xl': 1.75,
      '2xl': 2,
    },

    // -------------------------------------------------
    // Spacing
    // -------------------------------------------------
    spacing: {
      'xs': 0.25,
      'sm': 0.5,
      'md': 1,
      'lg': 1.5,
      'xl': 2,
    },

    // -------------------------------------------------
    // Colors (fallback)
    // -------------------------------------------------
    colors: {
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        muted: '#94a3b8',
      },
    },
  },

  // -------------------------------------------------
  // Dark Mode
  // -------------------------------------------------
  darkMode: 'class',
}
