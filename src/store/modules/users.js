/*
 * @Author: 王佳鑫
 * @Date: 2023-01-04 17:45:00
 * @LastEditors: 王佳鑫
 * @LastEditTime: 2023-01-04 17:47:26
 * @FilePath: /webpack5/src/store/modules/users.js
 * @Description: --
 * Copyright (c) 2023 by 王佳鑫/天天基金, All Rights Reserved.
 */
// src/store/modules
const state = () => ({
  token: null
})

const getters = {
  token: (state) => state.token
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}