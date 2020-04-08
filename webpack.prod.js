// webpack.prod.js - production builds
const LEGACY_CONFIG = "legacy";
const MODERN_CONFIG = "modern";

// node modules
const glob = require("glob-all");
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

// webpack plugins
const rimraf = require("rimraf");
const CompressionPlugin = require("compression-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WhitelisterPlugin = require("purgecss-whitelister");
const zopfli = require("@gfx/zopfli");

// config files
const common = require("./webpack.common.js");
const settings = require("./webpack.settings.js");

// Clean build assets before continuing
rimraf(settings.paths.dist.base, {}, () =>
  console.log("\n\nRemoved all previous build assets.\n")
);

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

// Configure Compression webpack plugin
const configureCompression = () => {
  return {
    filename: "[path].gz[query]",
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
    compressionOptions: {
      numiterations: 15,
      level: 9,
    },
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback);
    },
  };
};

// Configure Image loader
const configureImageLoader = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
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
  }
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|webp)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "img/[name].[hash].[ext]",
          },
        },
        {
          loader: "img-loader",
          options: {
            plugins: [
              require("imagemin-gifsicle")({
                interlaced: true,
              }),
              require("imagemin-mozjpeg")({
                progressive: true,
                arithmetic: false,
              }),
              require("imagemin-optipng")({
                optimizationLevel: 5,
              }),
              require("imagemin-svgo")({
                plugins: [{ convertPathData: false }],
              }),
            ],
          },
        },
      ],
    };
  }
};

// Configure SVG loader
const configureSvgLoader = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.svg$/,
      oneOf: [
        {
          loader: "vue-svg-loader",
        },
        {
          resourceQuery: /external/,
          loader: "file-loader",
          query: {
            name: "img/[name].[hash].[ext]",
          },
        },
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.svg$/,
      oneOf: [
        {
          loader: "vue-svg-loader",
        },
        {
          resourceQuery: /external/,
          use: [
            {
              loader: "file-loader",
              query: {
                name: "img/[name].[hash].[ext]",
              },
            },
            {
              loader: "img-loader",
              options: {
                plugins: [
                  require("imagemin-svgo")({
                    plugins: [{ convertPathData: false }],
                  }),
                ],
              },
            },
          ],
        },
      ],
    };
  }
};

// Configure optimization
const configureOptimization = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      splitChunks: {
        cacheGroups: {
          default: false,
          common: false,
          styles: {
            name: settings.vars.cssName,
            test: /\.(pcss|css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin(configureTerser()),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
            safe: true,
            discardComments: true,
          },
        }),
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      minimizer: [new TerserPlugin(configureTerser())],
    };
  }
};

// Configure Postcss loader
const configurePostcssLoader = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(css)$/,
      use: [
        MiniCssExtractPlugin.loader,
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
  }
  // Don't generate CSS for the modern config in production
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      loader: "ignore-loader",
    };
  }
};

// Configure PurgeCSS
const configurePurgeCss = () => {
  let paths = [];
  // Configure whitelist paths
  for (const [key, value] of Object.entries(settings.purgeCssConfig.paths)) {
    paths.push(path.join(__dirname, value));
  }

  return {
    paths: glob.sync(paths),
    whitelist: WhitelisterPlugin(settings.purgeCssConfig.whitelist),
    whitelistPatterns: settings.purgeCssConfig.whitelistPatterns,
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: settings.purgeCssConfig.extensions,
      },
    ],
  };
};

// Configure terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true,
  };
};

// Production module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      filename: path.join("./js", "[name]-legacy.[chunkhash].js"),
    },
    mode: "production",
    devtool: "source-map",
    optimization: configureOptimization(LEGACY_CONFIG),
    module: {
      rules: [
        configurePostcssLoader(LEGACY_CONFIG),
        configureImageLoader(LEGACY_CONFIG),
        configureSvgLoader(LEGACY_CONFIG),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        path: path.resolve(__dirname, settings.paths.dist.base),
        filename: path.join("./css", "[name].[chunkhash].css"),
      }),
      new PurgecssPlugin(configurePurgeCss()),
      new CompressionPlugin(configureCompression()),
    ],
  }),
  merge(common.modernConfig, {
    output: {
      filename: path.join("./js", "[name].[chunkhash].js"),
    },
    mode: "production",
    devtool: "source-map",
    optimization: configureOptimization(MODERN_CONFIG),
    module: {
      rules: [
        configurePostcssLoader(MODERN_CONFIG),
        configureImageLoader(MODERN_CONFIG),
        configureSvgLoader(LEGACY_CONFIG),
      ],
    },
    plugins: [
      new ImageminWebpWebpackPlugin(),
      new CompressionPlugin(configureCompression()),
    ],
  }),
];
