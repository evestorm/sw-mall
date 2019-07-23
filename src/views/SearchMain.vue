<template>
  <div id="search-main">
    <!-- 顶部搜索栏 -->
    <div class="search-bar">
      <form action="javascript:return true;">
        <van-search placeholder="请输入搜索关键词" v-model="query" show-action shape="round" class="search-input"
          @cancel="gotoHome" @search="getGoodsList" />
      </form>
    </div>
    <!-- 历史记录 -->
    <div class="search-history" v-show="query.length <= 0">
      <div class="title">搜索记录<span class="iconfont icon-delete" @click="removeAllHistory"></span></div>
      <ul>
        <li v-for="(item, index) in historyList" :key="index">
          <span @click="getGoodsListByHistory(item)">{{item}}</span><span class="iconfont icon-close"
            @click="removeHistory(item)"></span>
        </li>
      </ul>
    </div>
    <!-- 搜索结果 -->
    <div class="search-list" v-show="query.length > 0">
      <div class="search-condition">
        <div v-for="(item, index) in queryList" :key="index" :class="active === index ? 'active' : ''"
          @click="changeQuery(item, index)">
          {{item.name}}<span v-if="item.icon" :class="shengjiangxu"></span>
        </div>
      </div>
      <van-list class="search-results" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodsList" :key="index">
          <div class="list-item-img">
            <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
          </div>
          <div class="list-item-text">
            <div>{{item.NAME | stringFilter(30)}}</div>
            <div class="goods-price"><span>¥</span>{{item.PRESENT_PRICE | moneyFilter}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      query: '',
      list: [],
      loading: false,
      finished: false,
      goodsList: [], // 商品列表信息
      page: 1, // 商品列表的页数
      errorImg: 'this.src="' + require('@/common/images/no_photo.jpg') + '"', // 图片未加载
      active: 0, // 当前高亮筛选index
      queryList: [{
        name: '综合',
        icon: false,
        mark: 'all'
      },
      {
        name: '销量',
        icon: false,
        mark: 'sales'
      },
      {
        name: '价格',
        icon: true,
        mark: 'price'
      },
      {
        name: '新品优先',
        icon: false,
        mark: 'new'
      }], // 查询条件
      isDesc: true, // 是否降序
      historyList: [] // 搜索记录
    }
  },
  created() {
    if (storage.get('historylist').length > 0) {
      this.historyList = storage.get('historylist')
    }
  },
  mounted() {
    var deviceHeight = document.documentElement.clientHeight || document.body.clientHeight
    var searchPage = document.getElementById('search-main')
    searchPage.style.height = deviceHeight + 'px'
  },
  methods: {
    // 点击取消返回首页
    gotoHome() {
      this.$router.go(-1)
    },
    // 上拉加载更多
    onLoad() {
      console.log('onLoad')
      this.getGoodsList()
    },
    // 搜索结果
    getGoodsList() {
      this.saveHistory()
      console.log('getGoodsList')
      console.log(this.page)
      console.log(this.active, this.isDesc)
      this.$api.getGoodsListBySearch({
        page: this.page,
        name: this.query,
        mark: this.queryList[this.active].mark,
        isdesc: this.isDesc
      }).then(data => {
        console.log(data)
        if (data.length > 0) {
          this.page++
          this.goodsList = this.goodsList.concat(data)
          this.finished = false
        } else {
          console.log(data)
          // 没有数据了的时候
          this.finished = true
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.finished = false
      })
    },
    // 查询规则
    changeQuery(item, index) {
      this.active = index
      if (item.name === '价格') {
        this.isDesc = !this.isDesc
      } else {
        this.isDesc = true
      }
      this.page = 1
      this.goodsList = []
      this.getGoodsList()
    },
    // 跳转到商品详情页
    goGoodsInfo(id) {
      this.$router.push({
        name: 'Goods',
        params: {
          goodsId: id
        }
      })
    },
    // 从历史记录点击搜索
    getGoodsListByHistory(item) {
      this.query = item
      this.goodsList = []
      this.active = 0
      this.page = 1
      this.getGoodsList()
    },
    // 保存历史记录
    saveHistory() {
      let historyArr = storage.get('historylist')
      if (historyArr.indexOf(this.query) > -1) return
      historyArr.unshift(this.query)
      this.historyList = historyArr
      storage.set('historylist', historyArr)
    },
    // 删除单个历史记录
    removeHistory(item) {
      let historyArr = storage.get('historylist')
      let findIndex = historyArr.indexOf(item)
      if (findIndex > -1) {
        historyArr.splice(findIndex, 1)
      }
      this.historyList = historyArr
      storage.set('historylist', historyArr)
    },
    // 删除所有历史记录
    removeAllHistory() {
      storage.set('historylist', [])
      this.historyList = []
    }
  },
  computed: {
    // 销量的升降序
    shengjiangxu() {
      let classStr = 'iconfont '
      if (this.active !== 2) {
        classStr += 'icon-down'
      }
      if (this.isDesc && this.active === 2) {
        classStr += 'icon-down'
      } else if (!this.isDesc && this.active === 2) {
        classStr += 'icon-up'
      }
      return classStr
    }
  },
  watch: {
    query(val) {
      if (val.length === 0) {
        this.goodsList = []
      }
    }
  }
}
</script>

<style scoped lang="stylus">
#search-main
  box-sizing border-box
  padding-top 56px
  background-color #f1f1f1
  height 100%
  overflow hidden
  -webkit-overflow-scrolling touch

.search-bar
  position fixed
  z-index 9999
  top 0
  width 100%
  height 56px

.search-history
  height 100%
  overflow-y scroll
  --webkit-overflow-scrolling touch
  // margin-top 56px
  font-size 14px
  padding 0 10px

  .title
    font-size 14px
    font-weight bold
    margin 10px 0

    span
      float right
      margin-top 2px

  ul
    li
      padding 0 20px
      height 40px
      display flex

      span:first-of-type
        flex 1

      span:last-of-type
        font-size 12px
        float right
        vertical-align -1px
        color gray

.search-list
  position relative
  box-sizing border-box
  height 100%
  overflow hidden
  .search-condition
    width 100%
    display flex
    font-size 12px
    border-bottom 1px solid #f1f1f1
    background-color #fff
    padding 10px 0

    div
      text-align center
      flex 1

      span
        font-size 10px

    div.active
      color #ff3a4f

  .search-results
    position absolute
    top 33px
    bottom 0
    width 100%
    overflow scroll
    --webkit-overflow-scrolling touch

  .list-item
    box-sizing border-size
    display flex
    font-size px2rem(32)
    padding 10px
    text-align center
    font-size 14px
    border-bottom 1px solid #f0f0f0
    background-color #fff

    .list-item-img
      min-height 84px
      line-height 84px
      padding 10px
      flex 1
      display flex
      justify-content flex-start

      img
        max-width 120px
        max-height 120px
        vertical-align middle

    .list-item-text
      text-align right
      flex 2
      padding 10px
      display flex
      flex-direction column
      justify-content space-between

      .goods-price
        color #ff3a4f

        // 给价格¥加3像素的右边距
        span
          margin-right 3px
</style>
