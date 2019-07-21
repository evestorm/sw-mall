<template>
  <div class="textarea-box">
    <h3>发表评论</h3>
    <textarea name="" :placeholder="tips" v-model="commentText"></textarea>
    <div class="edit">
      <van-button size="mini" type="default" @click="cancelComment" :disabled="!type || type === 0">取消</van-button>
      <van-button size="mini" type="default" @click="addComment" :disabled="commentText.length === 0">评论</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      commentText: '', // 评论内容
      tips: '说点儿什么吧~',
      type: 0, // 默认为0：顶级评论；1：二级评论
      pid: 0, // 默认顶级评论的pid为0
      replyId: 0, // 默认回复的是商品，为顶级评论，为0
      respondent: '', // 被回复人的昵称
      reviewerId: 0 // 被回复人的用户id
    }
  },
  created() {
    console.log(this.$store.getters.user)
    console.log(this.reviewerId, this.type)
  },
  methods: {
    // 提交评论【可选：顶级评论id，被回复评论id】
    addComment() {
      console.log('addComment')
      if (!this.$store.getters.user.id) {
        this.$toast.fail('请先登录哦亲~')
        return
      }
      console.log('提交评论按钮被点击了')
      console.log(this.reviewerId)
      this.$api.addComment({
        content: this.commentText,
        pid: this.pid,
        replyId: this.replyId,
        uid: this.$store.getters.user.id,
        reviewerId: this.reviewerId,
        goodsId: this.goodsId
      }).then(data => {
        this.commentText = ''
        this.$emit('addSuccess')
      }).catch(err => {
        console.log(err)
      })
    },
    // 撤销回复他人
    cancelComment() {
      console.log('点击了撤销回复他人按钮')
      this.pid = 0
      this.replyId = 0
      this.respondent = ''
      this.type = 0
    }
  },
  props: [
    'goodsId',
    'addSuccess' // 添加评论成功后通知父组件
  ],
  watch: {
    respondent(val) {
      if (val.length > 0) {
        this.tips = `你正在回复 @${this.respondent}`
      } else {
        this.tips = '说点儿什么吧~'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.textarea-box
  margin 20px

  // 标题【评论】
  h3
    padding 5px 0
    text-align left
    font-size 14px

  // 编辑区域
  textarea
    box-sizing border-box
    padding 10px
    overflow auto
    width 100%
    height 95px
    outline none // 去掉聚焦边框
    resize none // 不可拖拽
    border 1px solid #d8e2f4
    border-radius 5px
    font-size 12px

  .edit
    display flex
    justify-content flex-end
    font-size px2rem(84)

    // 提交按钮，撤销按钮公共样式
    .submit,
    .cancel
      width px2rem(84)
      height px2rem(46)
      line-height px2rem(46)
      border 1px solid grey
      border-radius px2rem(8)
      text-align center
      box-sizing border-box
      background-color #f1f1f1

    // 提交取消高亮
    .cancel
      margin-right px2rem(8)
</style>
