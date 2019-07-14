import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(`views/${view}`)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/main',
      component: loadView('Main'),
      children: [
        { path: '/', name: 'ShoppingMall', component: loadView('ShoppingMall') }
      ]
    }
  ]
})

export default router
