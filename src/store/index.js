/*
 * @Author: 王佳鑫
 * @Date: 2023-01-04 17:47:38
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 17:49:14
 * @FilePath: /webpack5/src/store/index.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */
// src/store/index.js
import { createStore } from 'vuex';

const files = require.context('./modules', false, /\.ts$/)
const modules = {}

files.keys().forEach((key) => {
    modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})
console.log('X1AXX1A modules', modules)
export default createStore({
    modules
})