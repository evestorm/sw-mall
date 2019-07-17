<template>
  <van-pull-refresh v-model="isLoading" @refresh="requestData">
    <!-- 顶部【LOGO+定位+searchbar】 -->
    <div class="search-bar">
      <van-row class="top">
        <van-col span="12" class="logo">首页</van-col>
        <van-col span="12" class="location">
          <img :src="locationIcon" alt="location" width="100%">
        </van-col>
      </van-row>
      <van-row class="search">
        <van-col span="24">
          <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" class="search-input" @click="gotoSearch" />
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img, index) in bannerPicArray" :key="index">
          <img v-lazy="img.image" width="100%" @click="gotoGoodsDetail(img.goodsId)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div @click="gotoCategoryList(index, cate.mallCategoryId)" v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner area -->
    <div class="ad-area" @click="gotoAdvertes">
      <img v-lazy="adBanner.image" width="100%">
    </div>
    <!-- Recommend goods area -->
    <div class="recommend-area">
      <sub-title-component :swTitleObj="{title: '商品推荐', route: {}}"></sub-title-component>
      <!-- 横向滚动推荐 -->
      <van-row class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recomment-item" @click="gotoGoodsDetail(item.goodsId)">
              <img :src="item.image" width="80%">
              <p>{{ item.goodsName | stringFilter(7) }}</p>
              <p>¥{{item.price | moneyFilter}}(¥{{item.mallPrice | moneyFilter}})</p>
            </div>
          </swiper-slide>
        </swiper>
      </van-row>
    </div>
    <!-- 楼层推荐 -->
    <div class="floor-area">
      <floor-component :goodsList="floor1" :swTitleObj="{title: floorName.floor1, route: {}}"
        @gotoDetail="gotoGoodsDetail"></floor-component>
      <floor-component :goodsList="floor2" :swTitleObj="{title: floorName.floor2, route: {}}"
        @gotoDetail="gotoGoodsDetail"></floor-component>
      <floor-component :goodsList="floor3" :swTitleObj="{title: floorName.floor3, route: {}}"
        @gotoDetail="gotoGoodsDetail"></floor-component>
    </div>
    <!--Hot Area-->
    <div class="hot-area">
      <sub-title-component :swTitleObj="{title: '热卖商品', route: {}}"></sub-title-component>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <!-- gutter:每列之间的空隙 -->
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info-component :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"
                :goodsId="item.goodsId">
              </goods-info-component>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
// vue-awesome-swiper 轮播图组件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import subTitleComponent from 'components/subTitleComponent'
import floorComponent from 'components/floorComponent'
import goodsInfoComponent from 'components/goodsInfoComponent'
import storage from '@/utils/storage.js'

export default {
  name: 'shoppingmall',
  data() {
    return {
      value: '',
      locationIcon: require('../common/images/location.png'),
      bannerPicArray: [],
      category: [],
      adBanner: {}, // 广告栏
      recommendGoods: [], // 商品推荐
      swiperOption: {
        slidesPerView: 3 // 横向滚动三个一组(一屏)
      },
      floor1: [], // 分类楼层
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [], // 热门商品
      isLoading: false // 是否处于刷新状态
    }
  },
  created() {
    this.getCategoryAndSub(() => {
      this.category = storage.get('category')
      this.requestData()
    })
  },
  methods: {
    // 获取首页数据
    requestData() {
      this.$api.getShoppingMallInfo().then(data => {
        let { adverts, slides, recommend, floor1, floor2, floor3, floorName, hotGoods } = data
        this.adBanner = adverts.length > 0 ? adverts[0] : {}
        this.bannerPicArray = slides
        this.recommendGoods = recommend
        this.floor1 = floor1
        this.floor2 = floor2
        this.floor3 = floor3
        this.floorName = floorName
        this.hotGoods = hotGoods

        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    // 一次性获取一二级商品分类
    getCategoryAndSub(callback) {
      let category = storage.get('category')
      let subCategory = storage.get('subCategory')
      // 如果本地没有分类则请求分类
      if (category.length <= 0 || subCategory.length <= 0) {
        this.$api.getCategory().then(data => {
          category = data.filter(v => v.parent_id === '0')
          subCategory = data.filter(v => v.parent_id !== '0')
          // 存储 一级分类 和 二级分类 到 localStorage
          storage.set('category', category)
          storage.set('subCategory', subCategory)
          callback && callback()
        })
      } else {
        callback && callback()
      }
    },
    // 前往商品列表页
    gotoCategoryList(index, cateid) {
      this.$router.push({ name: 'CategoryList', params: { index: index, categoryId: cateid } })
    },
    // 前往商品详情页
    gotoGoodsDetail(id) {
      this.$router.push({ name: 'Goods', params: { goodsId: id } })
    },
    // 前往搜索页
    gotoSearch() {
      this.$router.push({ name: 'SearchMain' })
    },
    // 我是广告位
    gotoAdvertes() {
      window.location.href = this.adBanner.link
    }
  },
  components: {
    swiper,
    swiperSlide,
    subTitleComponent,
    floorComponent,
    goodsInfoComponent
  }
}
</script>

<style lang="stylus">
// 顶栏
.search-bar
  height px2rem(200)
  background-color #fff
  .top
    height px2rem(80)
    line-height px2rem(80)
    padding px2rem(20) 10px 0 10px

    .logo
      font-size px2rem(58)
      vertical-align bottom

    .location
      text-align right
      img
        width px2rem(46)
        vertical-align px2rem(5.2)

  .search
    .van-search
      padding 10px

// 无缝滑屏
.swiper-area
  margin 10px
  border-radius px2rem(9.36)
  overflow hidden
  box-shadow 0px 5px 5px 1px rgba(97, 112, 124, 0.1)

  .van-swipe
    width 100% !important
    height px2rem(312)

// 推荐分类
.type-bar
  display flex
  justify-content space-between
  font-size 14px
  margin 10px
  div
    flex: 1
    text-align: center
    margin: px2rem(11.44)
    img
      margin-bottom: 5px

// 广告栏
.ad-area
  margin 0 10px

// 推荐商品列表
.recommend-area
  margin 10px

  .recommend-body
    padding 5px 0

    .recomment-item
      width 99%
      font-size 12px
      text-align center

      p
        margin 0
        line-height px2rem(38.48)
      p:first-of-type
        margin-top 5px

// floor area
.floor-area
    margin 10px

// hot area
.hot-area
    margin 10px
    font-size 14px
    line-height px2rem(69.68)
    .hot-goods
        margin-bottom: 50px
</style>
