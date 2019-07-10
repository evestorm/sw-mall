<template>
  <div class="index">
    <h1>{{msg}}</h1>
    <header></header>
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
  width px2rem(750px)
  height px2rem(100px)
  background-color pink
</style>
