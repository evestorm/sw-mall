<template>
  <van-row class="sub-title">
    <van-col span="24"><span>{{titleObj.title}}</span></van-col>
  </van-row>
</template>

<script>
export default {
  data() {
    return {
      titleObj: {},
      rightArrowIcon: require('../common/images/right_arrow.png')
    }
  },
  created() {
    this.titleObj = this.swTitleObj
  },
  props: [
    'swTitleObj'
  ],
  watch: {
    swTitleObj: {
      handler(newVal) {
        this.titleObj = newVal
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.sub-title
    line-height .56rem
    font-size 14px
    text-align: center
    margin: 20px 0 5px 0
    span
        border-bottom: 2px solid #ff3a4f
</style>
