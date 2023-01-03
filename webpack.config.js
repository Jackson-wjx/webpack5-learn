/*
 * @Author: 王佳鑫
 * @Date: 2023-01-03 16:33:31
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-03 17:34:14
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

module.exports = {
  mode: 'development', //development开发环境，production生产模式
  entry: './src/index.js', //入口文件
  output: {
    filename: '[name].js', // 输出文件
    path: path.resolve(__dirname, 'dist'), // 输出文件存放地址
  },
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
};
