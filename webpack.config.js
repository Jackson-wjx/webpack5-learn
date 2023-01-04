/*
 * @Author: 王佳鑫
 * @Date: 2023-01-03 16:33:31
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 13:51:06
 * @FilePath: /webpack5/webpack.config.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */

/**
entry 属性可以设置项目的入口文件
output 指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。
|-filename 设置输出的文件名
|-path 输出文件存放目录。
 */
//webpack.config.js
const path = require('path');
// 管理输出
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 创建前清空 dist 文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', //development开发环境，production生产模式
  entry: './src/index.js', //入口文件
  output: {
    filename: '[name].[contenthash].js', // 输出文件
    path: path.resolve(__dirname, 'dist'), // 输出文件存放地址
  },
  // 打包文件多出一行source-map
  // devtool: "inline-source-map",
  // 打包文件多出一个.map文件
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack配置的标题',
      template: './public/index.html',
      // 压缩html
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白字符与换行符
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 模块 loader 可以链式调用。链中的每个 loader 都将对资源进行转换。链会逆序执行。
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset', //在导出一个 data URI 和发送一个单独的文件之间自动选择
      },
    ],
  },
  // 解析
  resolve: {
    extensions: ['.vue', '.js'], // 表示在import 文件时，后缀名可以不写
    alias: {
      '@': path.join(__dirname, 'src'),
      // 这里的别名配置需与 jsconfig 中的 paths 别名一致
      // import的文件在src下component里的时候可以直接写成 @/component/...
      // 但是使用 alias 的时候，可能会发现路径和函数的智能提示不见了，如果路径名称很复杂的话很容易写错而且也不方便。
      // 这时候可以在根目录新增jsconfig.json, 若项目集成 TypeScript 的时候，配置文件则是 tsconfig.json，设置 allowJs: true，jsconfig.json 才生效。
    },
  },
  // 起服务 挂代理
  devServer: {
    // contentBase: './dist',
    static: './public',
    hot: true,
    // proxy: {
    //   '/api': {
    //     target: 'https://other-server.example.com',
    //     // 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，可以这样修改配置
    //     secure: false,
    //     pathRewrite: {
    //       '^/api': ''
    //     },
    //   },
    // },
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为。
        changeOrigin: true,
      },
    ],
  },
  // 外部拓展 在项目中通过 import 引入的依赖在打包的时候不会打包到 bundle 中去，而是通过 script 引入的方式去访问这些依赖。
  externals: {
    jquery: 'jQuery',
  },
  // 拆单独的bundle
  optimization: {
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

// @babel/preset-env 提供了一个 useBuiltIns 参数，设置值为 usage 时，就只会包含代码需要的 polyfill 。
