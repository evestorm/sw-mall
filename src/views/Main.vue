<template>
  <div class="main">
    <div class="main-div">
      <keep-alive>
        <router-view v-if="$route.path !== '/categoryList'"></router-view>
      </keep-alive>
      <router-view v-if="$route.path === '/categoryList'"></router-view>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      nowPath: '' // 当前路径
    }
  },
  created() {
    // 进入main才会触发
    this.changeTabBarActive()
  },
  updated() {
    // 业务逻辑复杂后，有时候需要在各种页面判断当前所在高亮
    this.changeTabBarActive()
  },
  methods: {
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({
            name: 'ShoppingMall'
          })
          break
        case 1:
          this.$router.push({
            name: 'CategoryList'
          })
          break
        case 2:
          this.$router.push({
            name: 'Cart'
          })
          break
        case 3:
          this.$router.push({
            name: 'Member'
          })
          break
        default:
          break
      }
    },
    // 改变当前底部导航高亮【根据route.path】
    changeTabBarActive() {
      this.nowPath = this.$route.path
      console.log(this.nowPath)
      switch (this.nowPath) {
        case '/main':
          this.active = 0
          break
        case '/categoryList':
          this.active = 1
          break
        case '/cart':
          this.active = 2
          break
        case '/member':
          this.active = 3
          break
        default:
          this.active = 0
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-tabbar-item--active
  color #fd3041
</style>
