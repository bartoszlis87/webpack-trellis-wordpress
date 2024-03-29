/* eslint-disable */

const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageMinWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

const config = require("./project.config");

module.exports = {
  mode: "production",
  devtool: "source-map",
  stats: true,
  plugins: [
    new FaviconsWebpackPlugin({
      logo: `${config.favicon}`,
      outputPath: `/icons/`,
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false
        }
      }
    }),
    new ImageMinWebpWebpackPlugin({
      config: [
        {
          test: /(images).*\.(jpe?g|png)/,
          options: {
            quality: 75
          }
        }
      ],
      overrideExtension: false
    }),
    new ImageminPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 75,
          progressive: true
        })
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        }
      })
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendors/${packageName.replace("@", "")}`;
          }
        }
      }
    }
  }
};
