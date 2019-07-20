# 项目编写步骤

## 准备工作

### 创建项目

```shell
# 通过 create 创建
vue create sw-mall
# 选择手动配置
? Please pick a preset: (Use arrow keys)
  default (babel, eslint)
❯ Manually select features
# 勾选如下配置（空格键进行勾选或取消）
? Check the features needed for your project:
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
❯◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
# 选择 history 模式
? Use history mode for router? (Requires proper server setup for index fallback in
 production) (Y/n) y
# 本项目采用 Stylus 预处理器
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by
 default):
  Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
❯ Stylus
 # 选择 Standard 代码风格检查器
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
❯ ESLint + Standard config
  ESLint + Prettier
# 询问在什么时候校验代码风格(1保存时，2提交时)【选1】
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i>
to invert selection)
❯◉ Lint on save
 ◯ Lint and fix on commit
# 把上面配置保存在单独文件还是融入package.json【选1，单独保存】
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files
  In package.json
# 是否把本次项目配置保存起来当做今后的可选配置【选否】
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicate
d config files
? Save this as a preset for future projects? (y/N) n
```

当你看到类似下面的提示，就表明你项目初始换完成：

```shell
🎉  Successfully created project sw-mall.
👉  Get started with the following commands:

 $ cd client
 $ npm run serve
```

### 移除不需要的内容

1. 移除 `src/assets/` 整个文件夹
2. 移除 `src/components/` 下的 `HelloWorld.vue`
3. 移除 `src/views/` 下的 `Home.vue` 以及 `About.vue`
4. 删除 `src/router.js` 中和 `Home.vue` 以及 `About.vue` 有关的代码
5. 删除 `src/App.vue` 中和 `Home.vue` 以及 `About.vue` 有关的代码；同时移除样式中 `#nav` 相关的代码

### 添加需要的内容

1.在 `src/views/` 下新建 `Index/vue` 文件：

  ```js
  <template>
    <div class="index">
      <h1>{{msg}}</h1>
    </div>
  </template>

  <script>
    export default {
      name: 'index',
      data() {
        return {
          msg: 'Hello World'
        }
      },
    }
  </script>

  <style lang="stylus" scoped>

  </style>
  ```

2.在 `src/router.js` 中引入 `Index.vue`：

  ```js
  import Index from './views/Index.vue'
  ...
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', name: 'index', component: Index }
  ]
  ```

3.`src/App.vue` 中的样式更改为：

  ```css
  <style lang="stylus">
  html,
  body,
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    width 100%
    height 100%
  </style>
  ```

4.在 `public/` 下新建css文件夹，并创建 `reset.css` 文件，该文件具体内容可在 `https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css` 中全选复制过来，最后在底部添加上我们自己定义的一些样式类：

  ```css
  ...
  /* 自定义样式 */
  a {
    text-decoration: none;
    color: black;
  }

  /* 修改vant默认search搜索框样式 */
  .van-search__content {
    border: 1px solid #7b7b7b !important;
  }

  img {
    vertical-align: bottom;
  }
  /* 默认还是有赞自带icon图标，一旦找不到，就用iconfont */
  .van-icon {
    font-family: 'vant-icon', 'iconfont' !important;
  }

  .van-icon-iconfont {
    line-height: 20px !important;
  }

  /* 导航栏左边返回按钮颜色 */
  .van-nav-bar__left .van-icon {
    color: #999 !important;
  }

  /* TODO: 坑：vant滑动cell的宽度设置了貌似不起作用，还需要在这里手动设置
    而且字体放在了span标签中，无法垂直居中对齐
  */
  .van-swipe-cell__right {
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 65px;
    background-color: #f44
  }

  .van-swipe-cell__right span {
      font-weight: normal;
      font-size: 20px;
      /* width: 50px; */
  }

  .sw-margin-lr-10 {
    margin: 0 10px;
  }
  .sw-margin-lr-20 {
    margin: 0 20px;
  }
  .sw-margin-lr-30 {
    margin: 0 30px;
  }
  ```

  然后在 `src/main.js` 中引入：`import '../public/css/reset.css'`

5.在 `src` 目录下新建一个 `common` 文件夹，今后整个项目通用的资源都会放在这儿管理，比如公共js，公共css等。然后在里面新建 `base.styl` 文件，添加一段解决浮动带来的父元素高度为0问题的代码：

  ```css
  .clearfix
    display: inline-block
    &:after
      content: ""
      clear: both
      height: 0
      line-height: 0
      visibility: hidden
  ```

6.在 `src/common` 文件夹下新建 `images` 文件夹，把本项目中会使用到的图片一次性导入

7.在 `public/index.html` 中的head里添加下面link，此link是加载一些icon字体的：
  ```html
  <link rel="stylesheet" href="https://at.alicdn.com/t/font_1109003_az34gjadu3h.css">
  ```

现在打开浏览器访问 `http://localhost:8080/` ，它应该能正常工作并显示「Hello Element」字样。

### rem适配

由于我们的商城应用是面向移动端的，所以屏幕的适配是跑不了的。本次项目我们将采用 rem 布局的实现方式。

p.s. 不了解 rem 布局的，可以先阅读[这篇文章](https://segmentfault.com/a/1190000019207842)

首先更改 `public/index.html` 中的 viewport：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

然后通过代码来控制 rem 的基准值（仍然在 index.html 中增加）：

```html
<body>
  ...
  <script>
  ;(function(doc, win) {
    const docEl = doc.documentElement
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    const recalc = () => {
      const clientWidth = docEl.clientWidth
      docEl.style.fontSize = clientWidth / 10 + 'px'
    }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
    recalc()
  })(document, window)
  </script>
</body>
```

这样我们就把当前设备的宽度划分成了10等份，每等份就是 1rem。

现在我们来测试下效果，来到我们的 `src/views/Index.vue` 页面，在 h1 标签下添加一行 `header` 标签：

```html
<div class="index">
  <h1>{{msg}}</h1>
  <header></header>
</div>
```

我们假定需要让这个 header 标签宽度在设计稿宽度为 750px 的 iPhone6 等设备下宽度100%，高100px。我们则可以给它设置如下样式：

```css
header
  width 10rem /* 计算公式：页面元素的rem值 = 页面元素值（px）/（屏幕宽度 / 划分的份数）= 750 / (750 / 10) */
  height 1.333333333rem
  background-color pink
```

回到页面你会发现效果很赞，header标签的大小将表现为随着浏览器宽度的变化而等比缩放。

然而我们程序员都是“偷懒”，上面的计算一次还好，但整个项目可不止一个元素需要换算，每一个都用上述公式计算可会累死。所以我们接下来会借助 stylus 预处理器定义一个全局方法，每次设置值的时候调用它，让它返回给我们根据公式计算出的对应px的rem值。

接着在 `src/common/stylus` 文件夹下新建一个 `minix.styl` 文件，在里面定义转化 rem 值的方法：

```js
/* 把px转为rem */
px2rem(designpx)
  $rem = 750 / 10;
  return (designpx / $rem )rem
```

然后借助 `style-resources-loader` 插件来导入此文件，在导入之前我们会发现 `stylus` 文件夹下有两个文件了，我们希望能一次性对这两个文件都进行导入，所以我们再新建一个 `index.styl` 文件，用它来整合所有 stylus 文件：

```css
@import './mixin.styl'
@import './base.styl'
```

然后一次性导入：

1. `npm i style-resources-loader` 安装插件
2. 在项目根目录下新建 `vue.config.js` 文件，添加下面代码：

  ```js
  const path = require('path')

  module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    chainWebpack: config => {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    }
  }

  function addStyleResource(rule) {
    rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/common/stylus/index.styl')
        ]
      })
  }
  ```

3. 在 `src/views/Index.vue` 中使用：

```css
header
  width px2rem(750) /*填入750设计稿下对应元素px值即可*/
  height px2rem(100)
  background-color pink
```

通过上面几个步骤，我们就完成了移动端适配的rem方案。

### 1物理像素边框问题

一般我们给元素设置1px的高在chrome调试下是没有问题的，然而在真实设备下，由于高分屏的原因，导致1px在dpr为2的设备上（e.g. iPhone 6）占据2个物理像素，在dpr为3的设备上（e.g. iPhone 6 Plus）占据3个物理像素。这就会导致真机上1px有可能“很粗”。为了解决这个问题，我们需要利用媒体查询的方法让1px根据设备dpr等比缩小。

来到 `src/common/stylus/mixin.styl` 文件，利用伪元素和媒体查询的组合方案给需要1像素高边框的元素添加边框：

```css
/* 给需要1px下边框的元素添加一个伪元素，
使其宽100%；高为用户自定义 */
border1px($color)
  position: relative
  &:after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ' '
    /* 给 dpr 1.5 的设备设置 0.7 的缩放 */
    @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)
      -webkit-transform: scaleY(.7)
      transform: scaleY(.7)
    /* 给 dpr 2.0 的设备设置 0.5 的缩放 */
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)
      -webkit-transform: scaleY(.5)
      transform: scaleY(.5)
```

使用方法：在 `src/views/Index.vue` 页面下跟着步骤来：

```html
<template>
  <div class="index">
    <h1>{{msg}}</h1>
    <!-- 1. 给需要添加1像素边框的元素设置一个类作为标识，让媒体查询能够识别 -->
    <header class="border1px"></header>
  </div>
</template>

<script>
...
</script>

<style lang="stylus" scoped>
header
  width px2rem(750)
  height px2rem(100)
  border1px(black) /* 2. 通过border1px设置边框 */
  background-color transparentify
</style>
```

### 路径别名

在vue的开发中，会经常引用 `src/views` 和 `src/components` 文件夹下的文件，此时无论使用 `@/` 还是 `../` 相对路径的方式都有点麻烦，所以为了省点代码，我们给这些常用路径起个别名，以后可以直接通过 `components/...` 的方式引用组件。我们来到 `vue.config.js` 配置文件，添加如下代码：

```js
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  ...
  chainWebpack: config => {
    ...

    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('common', resolve('src/common'))
  }
}
```

### 安装 Vant 组件库

```shell
npm i vant
npm i babel-plugin-import -D # 按需引入需要用到的插件
```

配置 `babel.config.js` ，引入vant的「组件库」和「样式」：

```js
plugins: [
  [
    'import', {
      libraryName: 'vant',
      style: true
    }
  ]
]
```

参考：[Vant快速上手 - 引入组件](https://youzan.github.io/vant/#/zh-CN/quickstart)

在 `main.js` 下引用本项目所需所有组件：

```js
import { Button, Search, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem, Cell, CellGroup, GoodsAction, GoodsActionButton,  Notify } from 'vant'
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
  .use(Notify)
```

页面中测试效果：

```js
<van-button type="info">信息按钮</van-button>
```

用法：

```js
<van-row><van-col span="24">span:24</van-col></van-row>
```

### 封装 axios

首先安装两个包：

```js
npm i axios qs
```

axios 的封装在 `src/http` 文件中进行，一共四个文件：

- config.js axios的默认配置
- api.js 二次封装 axios ，包含请求和响应拦截
- interface.js 请求接口文件
- index.js 将 axios 封装成插件

最后在 main.js 中做如下操作：

```js
import api from './http/index'
Vue.use(api)
```

组件中使用方法：

```js
this.$api.list(id).then(data => console.log(data))
```

具体代码见文件夹。

### 配置启动端口

来到 `vue.config.js` 文件，更新端口为 8090：

```js
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    port: 8090
  },
  ...
}
```

### 封装 localStorage 并把分类信息保存到本地

我们在请求首页数据时，不希望每次获取商品一二级分类的信息，因为这些内容不常改变，我们更希望第一次获取后把它们保存到本地，下次能够很方便的直接读取。

在 `src` 目录下新建 `utils` 文件夹，创建 `storage.js` 并编写如下代码：

```js
const storage = {
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
  },
  get: key => {
    return JSON.parse(localStorage.getItem(key) === null ? '[]' : localStorage.getItem(key))
  },
  remove: key => {
    localStorage.removeItem(key)
  }
}

export default storage
```

## 底部标签栏搭建

来到 `src/router.js` 先配置一波路由：

```js
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
```

根据上面的路由结构我们创建相应文件：

- `src/views/`

  - `Main.vue` 此文件由 `Index.vue` 改名而来，用来充当底部标签对应页面的父容器
  - `ShoppingMall.vue` 首页
  - `CategoryList.vue` 商品分类页
  - `Goods.vue` 商品详情页
  - `Member.vue` 个人中心页
  - `Cart.vue` 购物车页面
  - `Register.vue` 注册页
  - `Login.vue` 登录页

这些文件除了 Main.vue ，创建出来后添加如下模板代码方便等会查看基本效果：

```js
<template>
  <div class="category">
    <h1>分类页</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>

</style>
```

然后回到 `src/views/Main.vue` 中编写页面结构：

```html
<template>
  <div class="main">
    <div class="main-div">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
```

具体业务代码在该文件中查看。

让我们回到浏览器，现在底部就会出现标签栏，点击后能够跳转到对应页面。

## 首页

### 安装滑动组件 vue-awesome-swiper

```shell
npm i vue-awesome-swiper
```

在需要使用的页面按需引入，比如我们首页就需要用它来做轮播图：

```js
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
```

### 请求数据

首页没有什么太多的逻辑，这里列出两个必要的数据接口吧：

1. 首先请求商品分类接口 `http://localhost:7001/admin/category`
2. 获取到数据以后再请求首页数据 `http://localhost:7001/`

### 优化

#### 价格保留两位小数

我们在 `src` 下新建 `filter` 文件夹，编写 `moneyFilter.js` 文件：

```js
export function toMoney(money = 0) {
  return money.toFixed(2)
}
```

然后在 `src/main.js` 中全局引入：

```js
Vue.filter('moneyFilter', function (val) {
  return toMoney(val)
})
```

#### 商品标题过长显示省略号/时间字段截取

在 `src/filter` 中创建 `stringFilter.js` 文件：

```js
export function toSwString(str = '', howmany = 0) {
  return str.length > howmany ? str.substring(0, howmany) + '...' : str
}

export function toSwTime(str = '', howmany = 10) {
  return str.length > howmany ? str.substring(0, howmany) : str
}
```

同样在 `src/main.js` 中引入：

```js
Vue.filter('stringFilter', function (str, howmany) {
  return toSwString(str, howmany)
})
Vue.filter('timeFilter', function (str, howmany) {
  return toSwTime(str, howmany)
})
```

#### 添加全局 Loading 动画

在 `src/store.js` 中配置 loading 相关状态的操作：

```js
const state = {
    LOADING: false
}
const mutations = {
    showLoading(state){
        state.LOADING = true
    },
    hideLoading (state) {
        state.LOADING = false
    }
}
```

在 `src/components` 下创建 `loading.vue` 组件：

```js
<template>
  <div class="loading">
    <div class="center">
      <van-loading type="spinner" color="#fd3041" size="24px">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped lang="stylus">
.loading
  position fixed
  top 0
  left 0
  z-index 121
  width 100%
  height 100%
  background transparentify
  display table-cell
  vertical-align middle
  text-align center
  .center
    width 100%
    height 1rem
    margin 7.5rem auto
</style>
```

在 `src/App.vue` 中使用 loading 组件：

```js
<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from 'components/loading'
export default {
  computed: {
    ...mapState([
      'LOADING'
    ])
  },
  components: {
    Loading
  }
}
</script>
```

最后在 axios 响应请求拦截器中使用：

```js
// request 拦截器
instance.interceptors.request.use(config => {
  // 1. loading 动画
  store.commit('showLoading')
  ...
}, error => {
  return Promise.reject(error)
})

// response 拦截器
instance.interceptors.response.use(response => {
  // 停止loading
  store.commit('hideLoading')
  ...
}, error => {
  // 停止 loading 动画
  store.commit('hideLoading')
  ...
})
```

## 登录注册

安装解析token的包 `jwt-decode`：

```shell
npm i jwt-decode
```

两个页面分别位于：

- `src/views/Login.vue`
- `src/views/Register.vue`

### 如何自定义输入框左边图标

使用iconfont字体，将自己常用的图标放入[iconfont项目](https://www.iconfont.cn/)中。使用 font class 类型
1. 首先在 index.html 加载css样式：`<link rel="stylesheet" href="//at.alicdn.com/t/font_1109003_lvubgg6bw1e.css">`
2. 在base.css文件中添加iconfont字体图标的解析方式：

  ```css
  /* 默认还是有赞自带icon图标，一旦找不到，就用iconfont */
  .van-icon {
    font-family: 'vant-icon', 'iconfont' !important;
  }
  /* 设置icon高度（默认的有点矮） */
  .van-icon-iconfont {
    line-height: 20px !important;
  }
  ```

3. 在html中使用：

  ```html
  <!-- required：必须；clearable：有字时右边出现清除按钮 -->
  <van-field
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      required
      left-icon="iconfont icon-lock"
      clearable
      @click-right-icon="password=''"
      ></van-field>
  ```

登录注册的逻辑基本与「后台管理系统」的逻辑相同，不了解的可以点击[此处](https://github.com/evestorm/sw-mall-admin/blob/master/client/note.md#%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2)查看。

另外还封装了一个 `isEmpty` 方法到 `src/utils/index.js` 中，该方法用来判断解析的后端返回的token是否为空。

## 商品列表页

列表页请求接口：

- POST `goods/list` params: { curSubCateId, page }

页面路径：

- `src/views/CategoryList.vue`

### vant的tab标签页使用

滑动切换和吸顶效果：
```js
// 通过swipeable属性可以开启滑动切换标签页
// 通过sticky属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶
<van-tabs swipeable sticky></van-tabs>
```

### 下拉刷新

```js
// main中
import { PullRefresh } from 'vant'
Vue.use(PullRefresh)

// 组件中
// van-pull-refresh 控制下拉刷新
<van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
    // van-list 控制上拉加载更多
    <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="list-item" v-for="item in list" :key="item">
            {{item}}
        </div>
    </van-list>
</van-pull-refresh>
```

### 占位图片

图片加载失败时，可以给img标签添加一个响应属性 `onerror` ：

```html
<img :src="..." width="100%" :onerror="errorImg">
```

## 商品详情页

详情页接收商品ID去请求该商品的信息，具体代码在 `src/views/Goods.vue` 中。

### 评论组件

每个商品都有对应的评价，这里封装了一个评论组件，且它本身还包含有两个子组件，该评论组件的功能有「上拉加载更多」以及「对评论进行评论」。

它们都在 `src/components/comment/` 文件夹下：

- `commentsComponent.vue` 对外子组件
  - `contentComponent.vue` 楼层部分
  - `textareaComponent.vue` 编辑部分

#### 如何使用

在父组件中引用 `commentsComponent.vue` ，并传递商品id：

```html
<comments :goodsId="goodsId"></comments>
```

#### commentsComponent（父/对外组件）

包含两个子组件：

- 编辑部分 - commentTextarea
- 楼层部分 - commentContent

包含两个监听事件：

- 编辑组件发出的 addSuccess 事件，用来通知楼层部分刷新
- 评论组件发出的 notifyCommmerChanged 事件，用来通知编辑部分「评论对象」发生改变

```html
<div id="comment">
  <!-- 编辑部分 -->
  <comment-textarea :goodsId="goodsId" @addSuccess="refreshCommentList" ref="textarea"></comment-textarea>
  <!-- 评论内容部分 -->
  <commemt-content :goodsId="goodsId" ref="contentList" @changeCommender="notifyCommmerChanged"></commemt-content>
</div>
```

#### commentTextarea（子/编辑部分）

- addComment - 添加评论，成功后 $emit("addSuccess")
- cancelComment - 取消评论，重置「评论对象」

#### commentContent（子/列表部分）

- getCommentsList - 获取当前商品评论列表
- clickComment - 监听用户点击了哪个楼层进行评论，$emit("changeCommender")

#### 后端

##### 评论逻辑

关键字段：

- pid - 一级评论id
- replyid - 被回复评论的id

评论分为：

- 一级评论

- - 直接对商品进行评论 - pid 和 replyid 为 0

- 二级评论

- - 对一级评论进行回复 - pid 和 replyid 都为 一级评论id
  - 对楼中楼进行回复 - pid 为 一级评论 id，replyid 为你回复的评论id

## 购物车

购物车页面实现了「添加商品到购物车」，「本地存储」和「清空购物车」功能。没有实现与后端的进一步数据交互。

## 个人中心

个人中心页面只搭了个架子用来展示用户信息，没有很多逻辑，代码在 `src/views/Member.vue` 中。

这里要提一句的是，此刻用户刷新页面会导致「用户个人信息数据」丢失，这个bug在写后台管理系统中提到过，忘记了的小伙伴可以点击[这里查看](https://github.com/evestorm/sw-mall-admin/blob/master/client/note.md#%E5%AD%98%E5%82%A8%E5%88%B0-vuex)，讲bug这个段落在这一小节最后部分。

解决方案就是在 `src/App.vue` 根组件中对 `localStorage` 中是否存在 `token` 进行一个判断，如果有则保存到 `Vuex` 中：

```js
created() {
  if (!Array.isArray(storage.get('token'))) {
    const decode = jwtDecode(storage.get('token'))
    this.$store.dispatch('setAuthenticated', isEmpty(decode))
    this.$store.dispatch('setUser', decode)
  }
},
```

### 上传头像功能

封装上传头像组件，该组件在 `src/components/avatar.vue` 。具体的上传头像任务交给了 avatar ，并会在头像上传成功后通知父组件「个人中心页」，父组件收到消息后会重新请求一次用户数据来更新头像信息。

## 搜索页

搜索页是本项目最后一个功能，文件地址：`src/views/SearchMain.vue`，该页面主要搜索关键词为「商品名称」，次要排序是「综合」「销量」「价格」「新品优先」。搜索页另外一个功能就是就是搜索结果本地存储以及清除历史记录。

对应接口为：`localhost:8080/search` 。
