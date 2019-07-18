<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品分类" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="left-nav">
            <ul>
              <li @click="clickCategory(index, item.cate_id)" :class="{'category-active': categoryIndex === index}"
                v-for="(item, index) in category" :key="index">
                {{item.name}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategory-sub">
            <van-tabs :ellipsis="false" v-model="active" @click="onClicksubCategory">
              <van-tab :title="item.name" v-for="(item, index) in curSubCate" :key="index">
              </van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh loading-text="正在重新刷新..." v-model="isRefresh" @refresh="onRefresh">
              <van-list loading-text="正在加载更多..." finished-text="没有更多了" v-model="loading" :finished="finished"
                @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodsList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME | stringFilter(12)}}</div>
                    <div class="goods-price"><span>¥</span>{{item.PRESENT_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
  name: 'category',
  data() {
    return {
      category: [], // 大类类别
      categoryIndex: 0, // 当前高亮大类索引
      subCategory: [], // 所有小类类别总和
      curSubCate: [], // 当前小类类别
      curSubCateId: '', // 当前小类中被选中的ID
      active: 0, // 激活当前小类所在标签
      loading: false, // 上拉数据是否正在加载
      finished: false, // 是否还有数据可以执行上拉加载
      page: 1, // 商品列表的页数
      goodsList: [], // 商品列表信息
      isRefresh: false, // 下拉刷新
      errorImg: 'this.src="' + require('@/common/images/no_photo.jpg') + '"' // 图片未加载
    }
  },
  created() {
    console.log('created')
    let { index, categoryId } = this.$route.params
    let category = storage.get('category')
    let subCategory = storage.get('subCategory')
    if (index && categoryId) {
      console.log(index, categoryId)
      this.categoryIndex = index
      this.setCateAndSubCate(category, subCategory, index)
    } else {
      if (category.length > 0 && subCategory > 0) {
        this.setCateAndSubCate(category, subCategory)
      } else {
        this.$api.getCategory().then(data => {
          category = data.filter(v => v.parent_id === '0')
          subCategory = data.filter(v => v.parent_id !== '0')
          // 存储 一级分类 和 二级分类 到 localStorage
          storage.set('category', category)
          storage.set('subCategory', subCategory)
          this.setCateAndSubCate(category, subCategory)
        })
      }
    }
  },
  mounted() {
    console.log('mounted')
    let winHeight = document.documentElement.clientHeight || document.body.clientHeight
    document.getElementById('left-nav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
  },
  methods: {
    setCateAndSubCate(category, subCategory, curCategoryIndex = 0) {
      // 此时已存储完毕分类，可以给当前页面的 category 和 subCategory 赋值了
      this.category = category
      this.subCategory = subCategory
      console.log(curCategoryIndex)
      this.getsubCategoryByCategoryID(this.category[curCategoryIndex].cate_id)
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    clickCategory(index, categoryId) {
      console.log('clickCategory')
      this.categoryIndex = index
      this.curSubCate = this.subCategory.filter(sub => sub.parent_id === categoryId)
      // console.log(this.curSubCate)
      this.curSubCateId = this.curSubCate[0].cate_id
      this.page = 1
      this.finished = false
      this.goodsList = []
      this.getsubCategoryByCategoryID(categoryId)
    },
    // 根据大类ID读取小类类别列表
    getsubCategoryByCategoryID(categoryId) {
      console.log('getsubCategoryByCategoryID')
      console.log(this.subCategory)
      // 属于当前大类的小类们
      this.curSubCate = this.subCategory.filter(sub => sub.parent_id === categoryId)
      this.active = 0
      this.curSubCateId = this.curSubCate[0].cate_id
      console.log(this.curSubCate, this.curSubCateId)
      this.onRefresh()
    },
    // 上拉加载方法【会被默认触发】
    onLoad() {
      console.log('onLoad')
      // return
      // 当有子分类且不是下拉刷新状态时才触发上拉加载
      if (this.subCategory.length > 0 && this.isRefresh !== true) {
        // this.isRefresh = false
        console.log('onLoad开始上拉加载')
        this.curSubCateId = this.curSubCateId || this.subCategory[0].cate_id
        this.getGoodsList()
      }
    },
    // 下拉刷新【不会默认触发】
    onRefresh() {
      console.log('onRefresh')
      this.isRefresh = true
      this.finished = false
      this.loading = false
      this.goodsList = []
      this.page = 1
      this.getGoodsList()
    },
    // 获取商品列表数据
    getGoodsList() {
      console.log('getGoodsList')
      console.log(this.page, this.curSubCateId)
      // return
      this.$api.getGoodsListByCategorySubID({
        curSubCateId: this.curSubCateId,
        page: this.page
      }).then(data => {
        if (data.length > 0) {
          this.page++
          this.goodsList = this.goodsList.concat(data)
          this.finished = false
        } else {
          // 没有数据了的时候
          this.finished = true
        }
        this.isRefresh = false
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.isRefresh = false
        this.loading = false
        this.finished = false
      })
    },
    // 点击小类tab触发
    onClicksubCategory(index, title) {
      console.log('onClicksubCategory', index, title)
      this.curSubCateId = this.curSubCate[index].cate_id
      this.onRefresh()
    },
    // 跳转到商品详情页
    goGoodsInfo(id) {
      this.$router.push({
        name: 'Goods',
        params: {
          goodsId: id
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
#left-nav
  background aliceblue

  ul li
    line-height px2rem(78)
    border-bottom 1px solid #e1e1e1
    padding px2rem(6)
    font-size 16px
    text-align: center

#list-div
  overflow scroll
  -webkit-overflow-scrolling touch

  .list-item
    display flex
    padding px2rem(10)
    text-align center
    font-size 14px
    border-bottom 1px solid #f0f0f0
    background-color #fff

    .list-item-img
      min-height px2rem(168)
      line-height px2rem(166)
      flex 1

      img
        vertical-align middle

    .list-item-text
      text-align left
      flex 2
      margin 10px
      display flex
      flex-direction column
      justify-content space-between

      .goods-price
        color #ff3a4f

        // 给价格¥加3像素的右边距
        span
          margin-right 3px

// 反白效果
.category-active
  background-color #fff
  color #ff3a4f
</style>
