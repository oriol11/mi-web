/**
 * Typography plugin for Tailwind – defines custom font families,
 * text styles, and responsive type rules.
 */
import type { TailwindConfig } from '@tailwindcss/tailwind-config';

export const typography: (() => TailwindConfig) = () => ({
  // Font families
  fontFamily: {
    sans: 'Inter, "Segoe UI", Roboto, sans-serif',
    serif: "\`\`\`ui \`\`\`",
  },

  // Text styles
  textStyle: {
    'heading': {
      'small': 'font-medium',
      'medium': 'font-semibold',
      'large': 'font-bold',
      'xl': 'font-extrabold',
    },
    'body': {
      'small': 'text-sm',
      'base': 'text-base',
      'large': 'text-lg',
      'xl': 'text-xl',
    },
  },

  // Responsive adjustments
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    2xl: '1.5rem',
  },

  // Line height
  lineHeight: {
    xs: 1.25,
    sm: 1.35,
    base: 1.5,
    lg: 1.625,
    xl: 1.75,
    2xl: 2,
  },
});
