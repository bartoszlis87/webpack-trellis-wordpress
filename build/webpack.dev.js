/* eslint-disable */

const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const config = require("./project.config");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  stats: {
    hash: false,
    version: false,
    timings: true,
    children: false,
    errors: false,
    errorDetails: true,
    warnings: true,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false
  },
  devServer: {
    host: config.localServerHost,
    writeToDisk: true,
    compress: true,
    open: false,
    watchOptions: {
      poll: true
    },
    contentBase: config.watch,
    watchContentBase: true,
    hot: true,
    overlay: true,
    headers: {
      "Access-Control-Allow-Origin": `http://${config.localServerHost}:${config.localServerPort}`
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new BrowserSyncPlugin(
      {
        host: config.localServerHost,
        port: config.localServerPort,
        proxy: config.proxyUrl,
        open: true
      },
      {
        reload: false
      }
    )
  ],
  optimization: {
    noEmitOnErrors: true
  }
};
