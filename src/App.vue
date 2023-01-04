<!--
 * @Author: 王佳鑫
 * @Date: 2023-01-04 16:53:04
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 18:25:27
 * @FilePath: /webpack5/src/App.vue
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
-->
<!--App.vue-->

<script setup>
import { useStore } from 'vuex';

import Timer from '@/components/Timer.vue';

let store = useStore();
console.log('store', store);
console.log('我是App里123112的打印');
</script>

<template>
  <div>你好, Jackson。 --from Vue3</div>
  <Timer />
</template>

<style scoped></style>
