import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      fontFamily: {
        heading: "'Space Grotesk', sans-serif",
        body: "'DM Sans', sans-serif",
      },
      colors: {
        'brand-purple': '#5B5CF6',
        'brand-violet': '#7C79FF',
        'brand-purple-light': '#EEF2FF',
        'brand-navy': '#0D0F1F',
        'brand-navy-mid': '#1A1A3E',
        'neutral': {
          '50': '#F8F9FC',
          '100': '#F1F3F9',
          '200': '#E2E6F0',
          '300': '#C8CEDC',
          '400': '#9BA4B8',
          '500': '#6B7592',
          '600': '#4A5268',
          '700': '#2E3347',
          '800': '#1C2035',
          '900': '#0D0F1F',
        },
      },
    },
  },
} satisfies Config;
