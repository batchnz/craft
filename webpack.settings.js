// webpack.settings.js - webpack settings config

// node modules
require("dotenv").config();

// Webpack settings exports
// noinspection WebpackConfigHighlighting
module.exports = {
  name: "Batch Craft Starter",
  copyright: "Batch Development",
  paths: {
    src: {
      base: "./src/",
      css: "./src/css/",
      js: "./src/js/",
    },
    dist: {
      base: `${process.env.DOCROOT || "public"}/dist/`,
      clean: ["**/*"],
    },
    templates: "./templates/",
  },
  urls: {
    live: "https://www.example.co.nz/",
    local: `https://${process.env.VIRTUAL_HOST || "www.craftstarter.batch"}/`,
    publicPath: () => process.env.PUBLIC_PATH || "/dist/",
  },
  vars: {
    cssName: "styles",
  },
  entries: {
    app: "app.js",
  },
  babelLoaderConfig: {
    exclude: [/(node_modules|bower_components)/],
  },
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || "http://localhost:8080",
    host: () => process.env.DEVSERVER_HOST || "localhost",
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 8080,
    https: () => process.env.DEVSERVER_HTTPS || false,
  },
  manifestConfig: {
    basePath: "",
  },
  purgeCssConfig: {
    paths: ["./templates/**/*.{twig,html}", "./src/vue/**/*.{vue,html}"],
    whitelist: ["./src/css/components/**/*.{css}"],
    whitelistPatterns: [],
    extensions: ["html", "js", "twig", "vue"],
  },
};
