<template>
  <div id="sw-goods">
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="sw-margin-lr-20">
      <div class="goods-name">{{goodsInfo.NAME}}</div>
      <div class="goods-price"><span>¥</span>{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    </div>
    <div class="">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">
          <comments :goodsId="goodsId"></comments>
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <!-- 收藏 -->
      <!-- <div>
            </div>
            <div>
                <van-button square type="warning" @click="addGoodsToCart"> 加入购物车</van-button>
                <van-button square type="danger">直接购买 </van-button>
            </div> -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="gotoService" />
        <van-goods-action-icon icon="star-o" text="收藏" @click="addGoodsToCollection" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addGoodsToCart" />
        <van-goods-action-button type="danger" primary text="立即购买" @click="buyNow" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import commentsComponent from 'components/comment/commentsComponent'
import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {} // 商品详情信息
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    console.log(this.goodsId)
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$api.getGoodsDetail(this.goodsId).then(data => {
        console.log(data)
        this.goodsInfo = data.result
      }).catch(err => {
        console.log(err)
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    // 增加商品到购物车
    addGoodsToCart() {
      // 取出本地购物车的商品
      let cartInfo = storage.get('cartInfo')
      console.log(cartInfo)
      let isHaveGoods = cartInfo.find(item => item.goodsId === this.goodsId)
      console.log(isHaveGoods)
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        console.log(newGoodsInfo)
        cartInfo.push(newGoodsInfo)
        storage.set('cartInfo', cartInfo)
        this.$toast.success('添加成功')
      } else {
        this.$toast.success('已有此商品')
      }

      this.$router.push({
        name: 'Cart'
      })
    },
    // 立即购买
    buyNow() {
      this.$toast.success('立即购买')
    },
    // 咨询客服
    gotoService() {
      this.$toast.success('我是个假客服')
    },
    // 添加收藏
    addGoodsToCollection() {
      this.$toast.success('假装收藏')
    }
  },
  components: {
    'comments': commentsComponent
  }
}
</script>

<style scoped lang="stylus">
#sw-goods
  margin-bottom 64px

.goods-name
  font-size 16px
  padding px2rem(20) 0

.goods-price
  color #ff3a4f
  font-size 16px
  padding px2rem(20) 0

  span
    margin-right 3px

.goods-bottom
  position fixed
  bottom 0
  left 0
</style>
