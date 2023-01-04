/*
 * @Author: 王佳鑫
 * @Date: 2023-01-04 13:55:57
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 14:17:48
 * @FilePath: /webpack5/build/webpack.dev.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */
//webpack.dev.js
// 开发环境：调试定位、热替换等

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: '../dist',
        hot: true
    },
});