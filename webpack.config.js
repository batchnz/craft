const path = require("path");
const fs = require("fs");
const settings = require(`${process.cwd()}/node_modules/@batch/craft-webpack/webpack.settings.js`);

module.exports = {
  // Add your entry points here.
  // By default we have app and critical.
  entry: {
    app: path.resolve(
      settings.paths.working,
      settings.paths.src.js + settings.entries.app
    ),
    critical: path.resolve(
      settings.paths.working,
      `${settings.paths.src.js}/critical.js`
    )
  },
  // Add your Webpack aliases here.
  // We've provided a set of defaults mapped to the /src directory.
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "src"),
      "#vue": path.resolve(__dirname, "src/vue"),
      "#js": path.resolve(__dirname, "src/js"),
      "#css": path.resolve(__dirname, "src/css"),
      "#fonts": path.resolve(__dirname, "src/fonts"),
      "#svg": path.resolve(__dirname, "src/svg")
    }
  }
};
