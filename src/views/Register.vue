<template>
  <div class="register">
    <!-- 顶部导航 -->
    <van-row>
      <van-col span="24" class="nav-bar">
        <img :src="leftArrow" alt="left_arrow" width="100%" @click="goBack">
      </van-col>
    </van-row>
    <van-row class="main">
      <!-- 标题 -->
      <van-col span="24" class="title">
        <h1>注册</h1>
      </van-col>
      <!-- 表单 -->
      <van-row class="panel">
        <van-field v-model="username" label="用户名" placeholder="请输入用户名" required left-icon="iconfont icon-user" clearable
          @click-right-icon="username=''" :error-message="usernameErrorMsg" label-width="60"></van-field>
        <van-field v-model="email" label="邮箱" placeholder="请输入邮箱" required left-icon="iconfont icon-user" clearable
          @click-right-icon="email=''" :error-message="emailErrorMsg" label-width="60"></van-field>
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required
          left-icon="iconfont icon-lock" clearable @click-right-icon="password=''" :error-message="passwordErrorMsg" label-width="60">
        </van-field>
        <div class="btn">
          <van-button class="btn" type="default" size="large" round @click="registerAction" :loading="isLoading"
            loading-text="注册中...">立即注册</van-button>
        </div>
        <div class="bottom" @click="gotoLogin">
          <div class="shadow">
            <div class="inner"></div>
          </div>
          还有账号？<span>点击登录</span>
        </div>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'register',
  data() {
    return {
      leftArrow: require('../common/images/left_arrow.png'),
      username: '',
      email: '',
      password: '',
      isLoading: false, // 是否正在注册中（防止用户重复提交）
      usernameErrorMsg: '', // username填写错误时的提示
      emailErrorMsg: '', // email填写错误时的提示
      passwordErrorMsg: '' // password填写错误时的提示
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    registerAction() {
      this.checkForm() && this.axiosRegisterUser()
    },
    // 发起注册请求
    axiosRegisterUser() {
      this.isLoading = true
      this.$api.postRegister({
        username: this.username,
        email: this.email,
        password: this.password
      }).then(() => {
        this.username = this.email = this.password = ''
        Toast({
          message: '注册成功！正在跳转登录页面...',
          forbidClick: true,
          duration: 1500,
          loadingType: 'success'
        })
        setTimeout(() => {
          this.isLoading = false
          this.$router.push('/login')
        }, 1500)
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    // 表单验证
    checkForm() {
      let isOk = true
      const emailRER = /^\w+@\w+\.\w+(\.\w+)?$/
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else if (!this.email.match(emailRER)) {
        this.emailErrorMsg = '邮箱格式不正确'
        isOk = false
      } else {
        // 这个else是为了当第一次username为空时报错，
        // 但第二次用户填对了的时候，把错误消息重置为空
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能小于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    // 点击登录
    gotoLogin() {
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.register
  position relative
  box-sizing border-box
  padding 0 px2rem(58)
  height 100%
  background-color: #ff3a4ed6

  // 导航栏
  .nav-bar
    height 30px
    line-height 30px
    margin 15px 0 0 0

    img
      width 30px

  .main
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    min-width 84%
    margin auto

    // 标题
    .title
      position absolute
      left 0
      top -72px
      color white
      margin 15px 0

      h1
        font-size 42px
      @media screen and (max-width 320px)
        top -52px
        h1
          font-size 30px

    .panel
      position relative
      width 100%
      box-sizing border-box
      padding 20px 20px 96px 20px
      background-color #fff
      overflow hidden
      border-radius 10px

      @media screen and (max-width 320px)
        .panel
          padding 20px 20px 86px 20px

      .van-field
        background-color #efefef
        margin 20px 0

      .van-field:first-of-type
        margin 20px 0 0 0

      @media screen and (max-width 320px)
        .van-field
          margin 10px 0
        .van-field:first-of-type
          margin 10px 0 0 0

      .btn
        text-align center
        color #fff
        font-size 16px

        button
          font-size 16px
          font-weight lighter
          height 40px
          line-height 36px
          background -webkit-gradient(linear, left top, left bottom, from(#ff3a4ed6), to(#fc6663))
          background gradient(linear, left top, left bottom, from(#ff3a4ed6), to(#fc6663))
          background -prefix-linear-gradient(to top, #ff3a4ed6, #fc6663)
          background linear-gradient(to top, #ff3a4ed6, #fc6663)
          box-shadow 2px 4px 8px 0px rgba(46, 61, 73, 0.2)

      .bottom
        font-size 14px
        color rgb(167, 167, 167)
        position absolute
        left 0
        right 0
        bottom 0
        height 70px
        text-align center
        background-color #fff

        .shadow
          height 40px

          .inner
            height 10px
            box-shadow 0 5px 20px 5px #fc7e7c
            border-bottom-left-radius 10px
            border-bottom-right-radius 10px

          overflow hidden

        span
          color #fc6663
</style>
