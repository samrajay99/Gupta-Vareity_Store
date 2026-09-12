import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#13231d', forest: '#0a4d3b', leaf: '#0d6a52', mint: '#eaf7f1', gold: '#d4a84f', cream: '#f7f4ee' },
      fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
      boxShadow: { soft: '0 18px 45px rgba(10, 77, 59, .12)', glow: '0 22px 60px rgba(212, 168, 79, .24)' },
      keyframes: { float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }, shimmer: { '0%': { backgroundPosition: '-500px 0' }, '100%': { backgroundPosition: '500px 0' } } },
      animation: { float: 'float 5s ease-in-out infinite', shimmer: 'shimmer 2.4s linear infinite' }
    }
  },
  plugins: []
};
export default config;
