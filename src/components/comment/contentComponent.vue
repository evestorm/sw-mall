<template>
  <div class="comment-box">
    <h3><span>{{comments.length}}</span> 条回复</h3>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 顶级评论 -->
      <div class="comment-info" v-for="(item, index) in comments" :key="index">
        <div class="comment-title">
          <img class="avatar" :src="item.avatar" width="100%">
          <span class="nickname">{{item.username | stringFilter(12)}}</span>
          <span class="time">{{item.ctime | timeFilter}}</span>
        </div>
        <p @click="clickComment(item.cid, item.cid, item.username, item.uid)" class="comment-content">{{item.content}}
        </p>
        <!-- 对评论的评论 -->
        <div class="sub-comment-info" v-for="(reply, key) in item.reply" :key="key">
          <div class="comment-title">
            <img class="avatar" :src="reply.avatar" width="100%">
            <span class="nickname">{{reply.username | stringFilter(12)}}</span>
            <span class="time">{{reply.ctime | timeFilter}}</span>
          </div>
          <p @click="clickComment(item.cid, reply.cid, reply.username, reply.uid)" class="comment-content">回复
            <span>{{reply.reviewer_username}}</span>: {{reply.content}}</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      page: 1,
      loading: false,
      finished: false,
      comments: [],
      userInfo: {} // 当前用户信息
    }
  },
  created() {
    // 拿到当前登录用户信息
    this.userInfo = this.$store.getters.user
  },
  methods: {
    onLoad() {
      this.getCommentsList()
    },
    // 刷新
    reload() {
      this.page = 1
      this.comments = []
      this.loading = false
      this.finished = false
    },
    getCommentsList() {
      console.log(this.page, this.goodsId)
      this.$api.getCommentsListByGoodsId({
        page: this.page,
        goodsId: this.goodsId
      }).then(data => {
        console.log(data)
        if (data.length > 0) {
          this.page++
          this.comments = this.comments.concat(data)
          this.finished = false
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.finished = false
      })
    },
    // 点击了某个评论的内容，表示要对此评论回复
    clickComment(pid, replyId, username, uid) {
      this.$emit('changeCommender', pid, replyId, username, uid)
    }
  },
  props: [
    'goodsId',
    'changeCommender'
  ]
}
</script>

<style scoped lang="stylus">
// 评论父容器
.comment-box
  margin 20px

// 标题【评论】
h3
  border-left 3px solid #fd3041
  margin 8px 0
  padding-left 10px
  font-size 14px
  font-weight normal

  span
    font-weight bold

// 顶级评论列表
.comment-info
  font-size 14px

  .comment-title
    display flex
    align-items center
    padding px2rem(20) 0

    .avatar
      width px2rem(62)
      height px2rem(62)
      border-radius px2rem(30)
      overflow hidden
      margin-right px2rem(20)

    .nickname
      flex 1
      color #ff4f5e

    .time
      color grey
      margin-left auto

  // 二级评论列表
  .sub-comment-info
    padding-left px2rem(38)

    .comment-content
      span
        color grey
</style>
