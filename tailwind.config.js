module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./templates/**/*.{twig,html}",
    "./src/vue/**/*.{vue,html}"
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
