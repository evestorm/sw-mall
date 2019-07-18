/* eslint-disable import/first */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/reset.css'

// filter
import { toMoney } from '@/filter/moneyFilter'
import { toSwString, toSwTime } from '@/filter/stringFilter'

// 赋予在 Vue 原型上调用 $api 的能力
import api from './http/index'
Vue.use(api)

// 按需引入vant
import { Button, Search, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem, Cell, CellGroup, GoodsAction, GoodsActionButton, Toast, Loading, Uploader } from 'vant'
Vue.use(Button).use(Search)
  .use(Row).use(Col)
  .use(Swipe).use(SwipeItem).use(Lazyload)
  .use(List).use(Field).use(NavBar)
  .use(Tab).use(Tabs)
  .use(PullRefresh)
  .use(Stepper)
  .use(Tabbar).use(TabbarItem)
  .use(Cell).use(CellGroup)
  .use(GoodsAction).use(GoodsActionButton)
  .use(Toast)
  .use(Loading).use(Uploader)

Vue.filter('moneyFilter', function (val) {
  return toMoney(val)
})
Vue.filter('stringFilter', function (str, howmany) {
  return toSwString(str, howmany)
})
Vue.filter('timeFilter', function (str, howmany) {
  return toSwTime(str, howmany)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
