/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Tema claro: "ink" y "bone" se invierten respecto al diseño original
        // (ink = fondo claro de página, bone = texto oscuro / botones).
        // "void" conserva el negro original para overlays sobre fotos (Hero,
        // tarjetas de producto, scrims de modales), donde el texto debe
        // seguir siendo claro sin importar el tema del resto del sitio.
        ink: '#F1EFEA',
        graphite: '#FFFFFF',
        smoke: '#EBE7DE',
        line: '#E0DACD',
        bone: '#171614',
        fog: '#6E6C64',
        brass: {
          DEFAULT: '#96712F',
          soft: '#B08A47',
          dim: '#6E5322',
        },
        pine: '#3F8F63',
        void: '#0B0B0D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4), 0 12px 32px -12px rgba(0,0,0,0.55)',
        glow: '0 0 0 1px rgba(185,154,95,0.25), 0 8px 40px -8px rgba(185,154,95,0.15)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.35s ease-out both',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
