/* eslint-disable */

const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

const config = require("./project.config");
const assetsFilenames = config.isProduction ? config.cacheBusting : "[name]";

let webpackConfig = {
  entry: config.entry,
  context: config.assetsPath,
  output: {
    path: config.distPath,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
    chunkFilename: `scripts/${assetsFilenames}.bundle.js`
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        enforce: "pre",
        test: /\.(js|s?[ca]ss)$/,
        include: config.assetsPath,
        loader: "import-glob"
      },
      {
        test: /\.js$/,
        exclude: [/node_modules(?![/|\\](bootstrap|foundation-sites))/],
        use: [
          { loader: "buble-loader", options: { objectAssign: "Object.assign" } }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: true } },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "resolve-url-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "build/postcss.config.js" }
            }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.assetsPath,
        loader: "url-loader",
        options: {
          limit: 4096,
          name: `[path]${assetsFilenames}.[ext]`,
          publicPath: "../"
        }
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: /node_modules/,
        loader: "url-loader",
        options: {
          limit: 4096,
          outputPath: "vendor/",
          name: `${config.cacheBusting}.[ext]`
        }
      }
    ]
  },
  resolve: {
    modules: [config.assetsPath, "node_modules"],
    enforceExtension: false
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false
    }),
    new CopyWebpackPlugin(
      [
        {
          context: config.assetsPath,
          from: config.copy,
          to: config.distPath + `/[path]${assetsFilenames}.[ext]`,
          toType: "template",
          cache: true
        }
      ],
      { copyUnmodified: true }
    ),
    new MiniCssExtractPlugin({
      filename: `styles/${assetsFilenames}.css`,
      chunkFilename: "[id].css",
      ignoreOrder: false
    }),
    new WebpackAssetsManifest({
      output: "assets.json",
      space: 2,
      writeToDisk: config.isProduction,
      replacer: require("./util/assetManifestsFormatter")
    }),
    new FriendlyErrorsWebpackPlugin(),
    new StylelintPlugin()
  ]
};

webpackConfig = merge(webpackConfig, require(`./webpack.${config.env}`));

module.exports = webpackConfig;
