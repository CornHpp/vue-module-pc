/*
 * @Author: your name
 * @Date: 2020-10-21 20:29:55
 * @LastEditTime: 2020-10-21 22:35:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-module-pc\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
  
  ]
})
