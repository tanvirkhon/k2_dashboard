module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          600: '#2563EB',
        },
        green: {
          400: '#10B981',
        },
      },
    },
  },
  plugins: [],
}