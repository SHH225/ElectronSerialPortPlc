const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    proxy: {
      // '/api/': {
      //   target: '',
      //   changeOrigin: true,
      //   pathRewrite: { '^/api/admin': '/admin' },
      // }
    }
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", 'postcss-loader', "less-loader"]
      },
    ]
  }
});