// webpack.dev.js - developmental builds
const LEGACY_CONFIG = "legacy";
const MODERN_CONFIG = "modern";

// node modules
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const DashboardPlugin = require("webpack-dashboard/plugin");

// config files
const common = require("./webpack.common.js");
const settings = require("./webpack.settings.js");

// Configure the webpack-dev-server
const configureDevServer = (buildType) => {
  return {
    public: settings.devServerConfig.public(),
    contentBase: path.resolve(__dirname, settings.paths.templates),
    host: settings.devServerConfig.host(),
    port: settings.devServerConfig.port(),
    https: !!parseInt(settings.devServerConfig.https()),
    disableHostCheck: true,
    hot: true,
    overlay: true,
    watchContentBase: true,
    watchOptions: {
      poll: !!parseInt(settings.devServerConfig.poll()),
      ignored: /node_modules/,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

// Configure Image loader
const configureImageLoader = (buildType) => {
  return {
    test: /\.(png|jpe?g|gif|webp)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "img/[name].[hash].[ext]",
        },
      },
    ],
  };
};

// Configure SVG loader
const configureSVGLoader = () => {
  return {
    test: /\.svg$/,
    rules: [
      {
        oneOf: [
          {
            loader: "vue-svg-loader",
          },
          {
            resourceQuery: /^\?external/,
            loader: "file-loader",
            options: {
              name: "img/[name].[hash].[ext]",
            },
          },
        ],
      },
    ],
  };
};

// Configure the Postcss loader
const configurePostcssLoader = (buildType) => {
  return {
    test: /\.(pcss|css)$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "vue-style-loader",
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      {
        loader: "resolve-url-loader",
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  };
};

// Define the legacy webpack config
const legacyConfig = merge(common.legacyConfig, {
  output: {
    filename: path.join("./js", "[name]-legacy.[hash].js"),
    publicPath: settings.devServerConfig.public() + "/",
  },
  mode: "development",
  devtool: "cheap-source-map",
  devServer: configureDevServer(LEGACY_CONFIG),
  module: {
    rules: [
      configurePostcssLoader(LEGACY_CONFIG),
      configureImageLoader(LEGACY_CONFIG),
      configureSVGLoader(LEGACY_CONFIG),
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

// Define the modern webpack config
const modernConfig = merge(common.modernConfig, {
  output: {
    filename: path.join("./js", "[name].[hash].js"),
    publicPath: settings.devServerConfig.public() + "/",
  },
  mode: "development",
  devtool: "cheap-source-map",
  devServer: configureDevServer(MODERN_CONFIG),
  module: {
    rules: [
      configurePostcssLoader(MODERN_CONFIG),
      configureImageLoader(MODERN_CONFIG),
      configureSVGLoader(MODERN_CONFIG),
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

// Development module exports
module.exports = (env) => {
  const BUILD_TYPE = env && env.BUILD_TYPE;
  const dashboardPlugin = { plugins: [new DashboardPlugin()] };

  // Output either a legacy, modern or combined config.
  // Defaults to modern for development.
  switch (BUILD_TYPE) {
    case "combined":
      return [legacyConfig, merge(modernConfig, dashboardPlugin)];
    case "legacy":
      return [merge(legacyConfig, dashboardPlugin)];
    case "modern":
    default:
      return [merge(modernConfig, dashboardPlugin)];
  }
};
