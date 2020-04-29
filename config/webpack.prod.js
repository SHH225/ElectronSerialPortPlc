const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:7].css',
      chunkFilename: '[id].[hash:7].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"]
      }
    ]
  }
});