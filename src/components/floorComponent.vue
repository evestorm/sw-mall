<template>
  <div>
    <sub-title-component :swTitleObj="titleObj"></sub-title-component>
    <van-row class="recommend-floor">
      <!-- 不规则楼层 -->
      <div class="floor-anomaly">
        <div class="floor-one">
          <!-- 由于渲染页面时floor1只是个空数组，所以获取image时报错，价格v-if就好了 -->
          <img @click="clickImg(floor1[0].goodsId)" v-if="floor1[0]" :src="floor1[0].image" width="100%">
        </div>
        <div class="floor-two">
          <div>
            <img @click="clickImg(floor1[1].goodsId)" v-if="floor1[1]" :src="floor1[1].image" width="100%">
          </div>
          <div>
            <img @click="clickImg(floor1[2].goodsId)" v-if="floor1[2]" :src="floor1[2].image" width="100%">
          </div>
        </div>
      </div>
      <!-- 规则楼层 -->
      <div class="floor-rule">
        <div v-for="(item, index) in floor1.slice(3)" :key="index">
          <img @click="clickImg(item.goodsId)" :src="item.image" width="100%">
        </div>
      </div>
    </van-row>
  </div>
</template>

<script>
import subTitleComponent from './subTitleComponent'
export default {
  data() {
    return {
      floor1: [],
      titleObj: {}
    }
  },
  methods: {
    clickImg(id) {
      this.$emit('gotoDetail', id)
    }
  },
  props: [
    'goodsList',
    'swTitleObj',
    'gotoDetail'
  ],
  watch: {
    // 当props中的goodsList赋值后，把值传给当前组件data中的floor1
    goodsList(newVal) {
      this.floor1 = newVal
    },
    swTitleObj: {
      handler(newVal) {
        this.titleObj = newVal
      },
      deep: true
    }
  },
  components: {
    subTitleComponent
  }
}
</script>

<style scoped lang="stylus">
.recommend-floor
  margin-bottom 10px
  .floor-anomaly
    display flex
    div
      flex-basis 50%

    div.floor-two
      border-left 1px solid #efefef
      box-sizing border-box
      padding 5px 0

      div:first-of-type
        border-bottom 1px solid #efefef

  .floor-rule
    display flex
    flex-wrap wrap

    div
      box-sizing border-box
      border-top 1px solid #efefef
      flex-basis 50%
    div:nth-child(even)
      border-left 1px solid #efefef
</style>
