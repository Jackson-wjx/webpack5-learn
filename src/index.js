/*
 * @Author: 王佳鑫
 * @Date: 2023-01-03 16:31:57
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 17:49:51
 * @FilePath: /webpack5/src/index.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */
//index.js
import style from './index.css';
import imgSrc from '@/assets/img.png';
import imgSrcBg from '@/assets/background.png'
// import $ from 'jquery';
// console.log($('#app'));

import App from './App.vue';
import { createApp } from 'vue';
import store from './store'

createApp(App).use(store).mount('#app')


function comp() {
  const el = document.createElement('div');

  el.innerHTML = `<i>热更新2, webpack5</i><img src="${imgSrc}" /><img width="375px" height="782px" src="${imgSrcBg}" />`;

  // Babel 测试
  console.log([1, 2, 3, 6, 4].findIndex((x) => x === 4));
  console.log('abc'.padStart(10));

  return el;
}

document.body.appendChild(comp());
