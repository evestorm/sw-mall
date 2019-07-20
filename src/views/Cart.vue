<template>
  <div class="cart">
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <van-swipe-cell :right-width="65" :left-width="0" v-for="(item, index) in cartInfo" :key="index"
        :on-close="onClose(item, index)">
        <van-cell-group>
          <van-card :price="item.price" :title="item.name" :thumb="item.image">
            <div slot="footer">
              <van-stepper v-model="item.count"></van-stepper>
            </div>
          </van-card>
        </van-cell-group>
        <template slot="right">
          <span type="danger" class="iconfont icon-lajitong3"></span>
        </template>
      </van-swipe-cell>
    </div>
    <!-- 显示总金额 -->
    <div class="total-money">
      合计：<span style="margin-right: 10px;"><span>¥</span>{{totalMoney | moneyFilter}}</span>
      <van-button @click="tijiao" size="mini" round type="danger">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage'

export default {
  data() {
    return {
      cartInfo: [], // 购物车信息
      isEmpty: false // 购物车是否为空
    }
  },
  created() {
    this.getCartInfo()
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight || document.body.clientHeight
    let cart = document.querySelector('.cart')
    cart.style.height = winHeight + 'px'
  },
  methods: {
    getCartInfo() {
      // 得到购物车数据的方法
      if (localStorage.cartInfo) {
        this.cartInfo = storage.get('cartInfo')
      }
      this.isEmpty = this.cartInfo.length > 0
    },
    clearCart() {
      storage.remove('cartInfo')
      this.cartInfo = []
    },
    // 点击了单个cell
    onClose(goodsInfo, index) {
      return (clickPosition, instance) => {
        console.log(goodsInfo, index)
        // 点击删除
        switch (clickPosition) {
          case 'left':
          case 'cell':
          case 'outside':
            instance.close()
            break
          case 'right':
            let index = this.cartInfo.findIndex(v => v.goodsId === goodsInfo.goodsId)
            if (index > -1) {
              this.cartInfo.splice(index, 1)
              storage.set('cartInfo', this.cartInfo)
            }
            console.log(index)
            console.log('点击了关闭')
            instance.close()
            break
        }
      }
    },
    // 提交按钮
    tijiao() {
      this.$toast.success('点击了提交')
    }
  },
  computed: {
    totalMoney() {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      storage.set('cartInfo', this.cartInfo)
      return allMoney
    }
  }
}
</script>

<style scoped lang="stylus">
.cart
  position relative
  box-sizing border-box
  background-color #f1f1f1
  padding (46+48)px 0 (33+50)px 0
  height 100%
  overflow hidden

.navbar-div
  position fixed
  top 0
  left 0
  width 100%
  height 46px

.cart-title
  position fixed
  box-sizing border-box
  display flex
  justify-content flex-end
  align-items center
  top 46px
  left 0
  width 100%
  height 48px
  line-height 48px
  background-color #fff
  border-bottom 1px solid #e4e7ed
  padding 5px
  font-size 20px

// 购物车列表
.cart-list
  // 防止子容器垂直方向上的margin合并
  padding 1px 10px
  padding-bottom 50px
  height 100%
  overflow-y scroll
  -webkit-overflow-scrolling touch

.van-swipe-cell:first-of-type
  margin-top 10px

.van-swipe-cell
  // background-color red
  margin-bottom 10px

  .van-card
    background-color #fff

// 合计
.total-money
  position fixed
  position fixed
  bottom 50px
  left 0
  right 0
  font-size 14px
  text-align right
  background-color #fff
  border-top 1px solid #e4e7ed
  padding 5px

  span
    color #ff3a4f
    margin-right 3px

  button
    span
      color #fff
      margin-right 0
</style>
