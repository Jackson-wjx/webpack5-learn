//webpack.prod.js
// 生产环境：代码压缩、公共模块分离、资源优化等

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// terser-webpack-plugin用来压缩js代码 webpack5内置
const TerserPlugin = require('terser-webpack-plugin');
// 图片压缩
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              "svgo",
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  // 优化
  optimization: {
    // https://webpack.docschina.org/plugins/terser-webpack-plugin/
    // 压缩js
    minimize: true,
    // 压缩
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true, // 使用多进程并发执行，提升构建速度
      }),
      new TerserPlugin({
        parallel: true,
      })
    ],
  },
});
