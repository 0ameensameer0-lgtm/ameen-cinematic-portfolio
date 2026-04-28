module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#06b6d4',
        'dark-bg': '#0f172a',
        'dark-card': '#1a1a2e',
        'light-bg': '#f8fafc',
        'light-card': '#ffffff',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}
