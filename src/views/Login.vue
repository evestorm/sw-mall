<template>
  <div class="login">
    <!-- 顶部导航 -->
    <van-row>
      <van-col span="24" class="nav-bar">
        <img :src="leftArrow" alt="left_arrow" width="100%" @click="goBack">
      </van-col>
    </van-row>
    <!-- 标题 -->
    <van-row>
      <van-col span="24" class="title">
        <h1>登录</h1>
      </van-col>
    </van-row>
    <!-- 表单 -->
    <van-row class="panel">
      <van-field v-model="email" label="邮箱" placeholder="请输入邮箱" required left-icon="iconfont icon-user" clearable
        @click-right-icon="email=''" :error-message="emailErrorMsg"></van-field>
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required
        left-icon="iconfont icon-lock" clearable @click-right-icon="password=''" :error-message="passwordErrorMsg">
      </van-field>
      <div class="btn">
        <van-button class="btn" type="default" size="large" round @click="loginAction" :loading="isLoading"
          loading-text="登录中...">立即登录</van-button>
      </div>
      <div class="bottom" @click="gotoRegister">
        <div class="shadow">
          <div class="inner"></div>
        </div>
        还没有注册账号？<span>注册</span>
      </div>
    </van-row>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import { isEmpty } from '@/utils/index'
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      leftArrow: require('../common/images/left_arrow.png'),
      email: '',
      password: '',
      isLoading: false, // 是否正在登录中（防止用户重复提交）
      emailErrorMsg: '', // email填写错误时的提示
      passwordErrorMsg: '' // password填写错误时的提示
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    loginAction() {
      this.checkForm() && this.axiosloginUser()
    },
    // 发起登录请求
    axiosloginUser() {
      this.isLoading = true
      this.$api.postLogin({
        email: this.email,
        password: this.password
      }).then(data => {
        // 登录成功
        const { token } = data
        storage.set('token', token)
        // 解析token
        const decode = jwtDecode(token)
        // 存储数据
        this.$store.dispatch('setAuthenticated', isEmpty(decode))
        this.$store.dispatch('setUser', decode)
        // 页面跳转
        this.$router.push('/')
        this.isLoading = false
      }).catch(err => console.log(err))
    },
    // 表单验证
    checkForm() {
      let isOk = true
      const emailRER = /^\w+@\w+\.\w+(\.\w+)?$/
      if (!this.email.match(emailRER)) {
        this.emailErrorMsg = '邮箱格式不正确'
        isOk = false
      } else {
        // 这个else是为了当第一次email为空时报错，
        // 但第二次用户填对了的时候，把错误消息重置为空
        this.emailErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能小于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    // 去注册
    gotoRegister() {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.login
  box-sizing border-box
  padding 0 px2rem(58)
  height 100vh
  background-color #ff3a4ed6

  // 导航栏
  .nav-bar
    height px2rem(60)
    line-height px2rem(60)
    margin px2rem(30) 0 0 0

    img
      width px2rem(60)

  // 标题
  .title
    color white
    margin px2rem(30) 0 px2rem(80) 0

    h1
      font-size px2rem(82)

  .panel
    box-sizing border-box
    padding px2rem(60) px2rem(40) px2rem(180) px2rem(40)
    background-color #fff
    overflow hidden
    border-radius px2rem(20)
    position relative

    .van-field
      background-color #efefef
      margin px2rem(40) 0

    .van-field:first-of-type
      margin px2rem(10) 0 0 0

    .btn
      text-align center
      color #fff
      font-size px2rem(32)

      button
        font-size px2rem(32)
        font-weight lighter
        height px2rem(80)
        line-height px2rem(72)
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
