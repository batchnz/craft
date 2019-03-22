module.exports = {
  plugins: [
    require("postcss-import")({
      plugins: [require("stylelint")]
    }),
    require("tailwindcss")("./tailwind.js"),
    require("postcss-preset-env")({
      autoprefixer: { grid: true },
      features: {
        "nesting-rules": true
      }
    })
  ]
};
