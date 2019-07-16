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
  background rgba(0,0,0,0.3)
  display table-cell
  vertical-align middle
  text-align center
  .center
    width 100%
    height 1rem
    margin 7.5rem auto
</style>
