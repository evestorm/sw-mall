<template>
  <div class="main">
    <div class="main-div">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-tabbar-item--active
  color #fd3041
</style>
