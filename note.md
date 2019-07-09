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

1. 移除 `src/assets/` 下的 `logo.png`
2. 移除 `src/components/` 下的 `HelloWorld.vue`
3. 移除 `src/views/` 下的 `Home.vue` 以及 `About.vue`
4. 删除 `src/router.js` 中和 `Home.vue` 以及 `About.vue` 有关的代码
5. 删除 `src/App.vue` 中和 `Home.vue` 以及 `About.vue` 有关的代码；同时移除样式中 `#nav` 相关的代码

#### 添加需要的内容

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

现在打开浏览器访问 `http://localhost:8080/` ，它应该能正常工作并显示「Hello Element」字样。
