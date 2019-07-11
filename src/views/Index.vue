<template>
  <div class="index">
    <h1>{{msg}}</h1>
    <header class="border1px"></header>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      msg: 'Hello Element'
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  width px2rem(750)
  height px2rem(100)
  border1px(black)
  // border-bottom 1px solid black
  // height 1px
  background-color transparentify
</style>
