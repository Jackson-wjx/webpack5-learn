/*
 * @Author: 王佳鑫
 * @Date: 2023-01-03 16:31:57
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-03 17:36:57
 * @FilePath: /webpack5/src/index.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */
//index.js
import style from './index.css';
import imgSrc from '@/assets/img.png';

function comp() {
  const el = document.createElement('div');

  el.innerHTML = `<i>你好, X1AXX1A</i><img src="${imgSrc}" />`;

  // Babel 测试
  console.log([1, 2, 3].findIndex((x) => x === 4));
  console.log('abc'.padStart(10));

  return el;
}

document.body.appendChild(comp());
