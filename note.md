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
  ```

  然后在 `public/index.html` 中引入：`<link rel="stylesheet" href="css/reset.css">`

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

在 `main.js` 下引用：

```js
import { Button } from 'vant'
Vue.use(Button)
```

页面中测试效果：

```js
<van-button type="info">信息按钮</van-button>
```

最后引入 Col 和 Row 来布局行和列。vant 默认宽分为 24 份

```js
import { Button, Row, Col } from 'vant'
Vue.use(Button).use(Row).use(Col)
```

用法：

```js
<van-row><van-col span="24">span:24</van-col></van-row>
```

完成~

## 首页搭建

来到 `src/router.js` 先配置一波路由：

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
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
```

根据上面的路由结构我们创建相应文件：

- `src/views/Main.vue` 此文件是 `Index.vue` 换的马甲
- `src/views/ShoppingMall.vue`
