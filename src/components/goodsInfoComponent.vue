<template>
  <div class="goods-info" @click="goGoodsPage()">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="100%">
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
  methods: {
    goGoodsPage() {
      this.$router.push({
        name: 'Goods',
        query: {
          goodsId: this.goodsId
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.goods-info
  text-align center

  .goods-image
    box-sizing border-box
    padding 0 .37rem

    img
      border-radius 5px
      overflow hidden

  .goods-name
    padding 0 8px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
