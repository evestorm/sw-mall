<template>
  <div id="comment">
    <!-- 编辑部分 -->
    <comment-textarea :goodsId="goodsId" @addSuccess="refreshCommentList" ref="textarea"></comment-textarea>
    <!-- 评论内容部分 -->
    <commemt-content :goodsId="goodsId" ref="contentList" @changeCommender="notifyCommmerChanged"></commemt-content>
  </div>
</template>

<script>
import commemtContent from '../comment/contentComponent'
import commentTextarea from '../comment/textareaComponent'
export default {
  methods: {
    // 通知评论页刷新
    refreshCommentList() {
      console.log('要刷新了')
      this.$refs.contentList.reload()
    },
    // 改变回复对象为某个顶级评论或者某个顶级评论下的评论
    notifyCommmerChanged(pid, replyId, username, uid) {
      console.log(pid, replyId)
      this.$refs.textarea.pid = pid
      this.$refs.textarea.replyId = replyId
      this.$refs.textarea.respondent = username
      this.$refs.textarea.reviewerId = uid
      this.$refs.textarea.type = 1
    }

  },
  components: {
    'commemtContent': commemtContent,
    'commentTextarea': commentTextarea
  },
  props: [ 'goodsId' ]
}
</script>
