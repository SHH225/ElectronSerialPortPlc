const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const resolve = function (dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  entry: {
    index: resolve('../src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            interpolate: "require"
          }
        }
      },
      {
        test: /\.(png|jp?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,        // 小于8192字节的图片打包成base 64图片
              name: devMode ? 'images/[name].[ext]' : 'images/[name].[hash:8].[ext]',
              esModule: false,  // 忽略这一项，html中的图片打包会出错，显示[object Module]
              publicPath: ''
            }
          },
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: devMode ? "media/[name].[ext]" : "media/[name].[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: devMode ? "font/[name].[ext]" : "font/[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: resolve('../src/assets'), to: './assets' }
    ]),
    new htmlWebpackPlugin({
      template: resolve('../src/index.html'),
      title: '工业虚拟仿真实验平台'
    }),
    // 打包分析插件
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    })
  ]
}