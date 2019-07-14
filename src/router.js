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
        { path: '/', name: 'ShoppingMall', component: loadView('ShoppingMall') },
        { path: '/categoryList', name: 'CategoryList', component: loadView('CategoryList') },
        { path: '/cart', name: 'Cart', component: loadView('Cart') },
        { path: '/member', name: 'Member', component: loadView('Member') }
      ]
    },
    { path: '/register', name: 'Register', component: loadView('Register') },
    { path: '/login', name: 'Login', component: loadView('Login') },
    { path: '/goods/:goodsId', name: 'Goods', component: loadView('Goods') },
    { path: '/searchMain', name: 'SearchMain', component: loadView('SearchMain') }
  ]
})

export default router
