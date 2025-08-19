/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // scans all files in src
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210, 10%, 90%)",          // border-border
        background: "hsl(0, 0%, 100%)",        // bg-background
        foreground: "hsl(210, 10%, 10%)",      // text-foreground
        ring: "hsl(210, 10%, 70%)",
      },
    },
  },
  plugins: [],
}
