/*
 * @Author: 王佳鑫
 * @Date: 2023-01-04 13:54:56
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 18:16:27
 * @FilePath: /webpack5/build/webpack.common.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */
//webpack.common.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 识别vue文件
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
  entry: './src/index.js', //入口文件
  output: {
    filename: '[name].[contenthash].js', // 输出文件
    path: path.resolve(__dirname, '../dist'), // 输出文件存放地址
  },
  resolve: {
    extensions: ['.vue', '.js'], //表示在import 文件时文件后缀名可以不写
    alias: {
      '@': path.join(__dirname, '../src'),
      //import的文件在src下的时候可以直接写成 @/component/...
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '我是webpack.config配置的标题',
      template: './public/index.html',
      //压缩HTML
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
      },
    }),
    new VueLoaderPlugin() //解析和转换.vue文件的插件
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/i,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset', //在导出一个 data URI 和发送一个单独的文件之间自动选择,url 或是base64
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  // https://webpack.docschina.org/guides/caching/
  optimization: {
    // deterministic 选项有益于长期缓存
    moduleIds: 'deterministic',
    // 使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk
    runtimeChunk: 'single',
    splitChunks: {
      // 利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，
      // 同时还能保证 client 代码和 server 代码版本一致。 这可以通过
      // 使用SplitChunksPlugin 插件的 cacheGroups 选项来实现。
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
