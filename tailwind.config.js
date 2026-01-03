/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Scan the main HTML file for Tailwind classes.
    // This is important for classes used directly in your root HTML file.
    "./index.html",
    // Scan all JavaScript, TypeScript, JSX, and TSX files
    // within the 'src' directory and any of its subdirectories.
    // This ensures that all Tailwind classes used in your React components
    // (e.g., .tsx, .jsx files) are detected and their CSS generated.
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2d936c",
          dark: "#01161e",
          light: "#e0e0e0",
          card: "#0c1f26",
          secondary: "#55aaaa",
          white: "#ffffff",
        },
      },
      fontFamily: {
        'de-valencia': ['"De Valencia"', 'sans-serif'],
        'montserrat-alternates': ['"Montserrat Alternates"', 'sans-serif'],
        'consolas': ['Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
