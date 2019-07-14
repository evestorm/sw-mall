import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Search, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem, Cell, CellGroup, GoodsAction, GoodsActionButton } from 'vant'
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
