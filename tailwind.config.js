/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#799dd6",
        "primary-container": "#003366",
        "surface-container-low": "#f2f4f7",
        "surface-dim": "#d8dadd",
        "secondary-fixed-dim": "#91d78a",
        "surface-container-high": "#e6e8eb",
        "surface": "#f7f9fc",
        "secondary-container": "#acf4a4",
        "tertiary-fixed-dim": "#ffb690",
        "tertiary-fixed": "#ffdbca",
        "tertiary-container": "#592300",
        "primary-fixed": "#d5e3ff",
        "background": "#f7f9fc",
        "on-secondary-fixed-variant": "#0c5216",
        "primary-fixed-dim": "#a7c8ff",
        "outline": "#737780",
        "on-background": "#191c1e",
        "on-primary-fixed": "#001b3c",
        "on-error-container": "#93000a",
        "inverse-on-surface": "#eff1f4",
        "outline-variant": "#c3c6d1",
        "on-tertiary-fixed-variant": "#723610",
        "on-tertiary-fixed": "#341100",
        "surface-tint": "#3a5f94",
        "inverse-surface": "#2d3133",
        "surface-variant": "#e0e3e6",
        "surface-container-highest": "#e0e3e6",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "on-secondary-fixed": "#002203",
        "surface-container": "#eceef1",
        "surface-bright": "#f7f9fc",
        "on-primary-fixed-variant": "#1f477b",
        "tertiary": "#381300",
        "error-container": "#ffdad6",
        "on-secondary": "#ffffff",
        "inverse-primary": "#a7c8ff",
        "primary": "#001e40",
        "secondary-fixed": "#acf4a4",
        "on-secondary-container": "#307231",
        "on-surface": "#191c1e",
        "on-surface-variant": "#43474f",
        "secondary": "#2a6b2c",
        "on-tertiary-container": "#d8885c",
        "surface-container-lowest": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-primary": "#ffffff"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Public Sans", "sans-serif"],
        body: ["Public Sans", "sans-serif"],
        label: ["Public Sans", "sans-serif"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
