module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          blue: {
            50: '#EBF5FF',
            100: '#E1EFFE',
            200: '#C3DDFD',
            300: '#A4CAFE',
            400: '#76A9FA',
            500: '#3F83F8',
            600: '#1C64F2',
            700: '#1A56DB',
            800: '#1E429F',
            900: '#233876',
          },
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        animation: {
          'bounce-slow': 'bounce 3s linear infinite',
        },
      },
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        backgroundColor: ['disabled'],
        cursor: ['disabled'],
      },
    },
    plugins: [],
  };