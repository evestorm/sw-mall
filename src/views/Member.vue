<template>
  <div>
    <van-row class="top">
      <van-col span="8" class="logo">我的</van-col>
      <van-col span="16" class="logout">
        <div @click="logout">退出</div>
      </van-col>
    </van-row>
    <div class="about-me">
      <div class="name">
        <div class="nickname van-ellipsis">{{user.username}}</div>
        <span class="user-id">编号：{{prefixNumber}}</span><span class="iconfont icon-crown sw-icon"></span>
      </div>
      <div class="avatar">
        <avatar v-if="user.avatar" class="top-img" v-model="uploadImage" @upload="upload" :cube="{width: 70, height: 70, backgroundImage: user.avatar}"></avatar>
      </div>
    </div>
    <div class="shopping-info">
      <div class="contain">
        <div>0</div>
        <div>待付款</div>
      </div>
      <div class="contain">
        <div>0</div>
        <div>待发货</div>
      </div>
      <div class="contain">
        <div>0</div>
        <div>待收货</div>
      </div>
      <div class="contain">
        <div><span class="iconfont icon-shopping"></span></div>
        <div>全部订单</div>
      </div>
    </div>
    <div>
      <van-cell-group>
        <!-- <van-cell title="会员卡" is-link /> -->
        <van-cell title="地址管理" is-link />
        <van-cell title="我的收藏" is-link />
        <van-cell title="浏览记录" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>

    </div>

  </div>
</template>

<script>
import Avatar from 'components/avatar.vue'
import storage from '@/utils/storage'

export default {
  name: 'member',
  data() {
    return {
      user: {}, // 用户信息
      uploadImage: ''
    }
  },
  mounted() {
    this.$api.getUserInfo().then(data => {
      this.user = data
    })
  },
  components: {
    Avatar
  },
  computed: {
    prefixNumber() {
      return (Array(9).join('0') + this.user.id).slice(-9)
    }
  },
  methods: {
    // 上传
    upload(data) {
      const user = this.user
      this.$api.updateUserInfo({
        avatar: data,
        email: user.email,
        username: user.username,
        id: user.id
      }).then(() => {
        this.user.avatar = data
        this.$toast.success('更新头像成功!')
      })
    },
    // 登出
    logout() {
      // 清除token
      storage.remove('fe-token')
      this.$store.dispatch('clearCurrentState')
      // 页面跳转
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="stylus">
// 顶部【我的-退出】
.top
  height 44px
  line-height 44px
  padding 10px 10px 0 10px

  .logo
    font-size 30px
    vertical-align bottom

  .logout
    font-size 16px
    text-align right
    color grey

// 我的信息展示
.about-me
  box-sizing border-box
  height 116px
  padding 0 20px
  display flex
  justify-content space-around
  align-items center
  flex-wrap nowrap
  font-size 20px

  .name
    flex 1

    .nickname
      font-size 16px
      max-width 50%
      vertical-align top
      padding-bottom 5px

    .user-id
      font-weight lighter
      font-size 12px

    .sw-icon
      margin-left 2px
      color #ffae37

  .avatar
    flex-basis 70px
    text-align right
    display flex
    margin-left auto

    .top-img
      width 70px
      height 70px
      border-radius 50px

// 我的订单展示
.shopping-info
  display flex
  text-align center
  font-size 12px
  box-sizing border-box
  padding-bottom 10px

  .contain
    flex 1

    div:first-child
      font-size 18px
      font-weight bold
</style>
