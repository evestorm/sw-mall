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
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" required left-icon="iconfont icon-user" clearable
        @click-right-icon="username=''" :error-message="usernameErrorMsg"></van-field>
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
      username: '',
      password: '',
      isLoading: false, // 是否正在登录中（防止用户重复提交）
      usernameErrorMsg: '', // username填写错误时的提示
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
        username: this.username,
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
        this.$router.push('/main')
        // console.log(res)
        // if (res.data.code === 200 && res.data.message === true) {
        //   // 本地存储
        //   new Promise((resolve, reject) => {
        //     console.log(res.data.data.userInfo)
        //     userStorage.setUserInfo(res.data.data.userInfo)
        //     // 由于本地存储没有回调函数，所以用一个settimeout
        //     setTimeout(() => {
        //       resolve()
        //     }, 500)
        //   }).then(() => {
        //     Toast.success("登录成功")
        //     this.$router.push("/")
        //   }).catch(err => {
        //     console.log(err)
        //     this.isLoading = false
        //     Toast.fail("登录状态保存失败")
        //   })
        // } else {
        //   Toast.fail("登录失败，请检查用户名或密码是否填写正确")
        //   this.isLoading = false
        // }
      }).catch(err => console.log(err))
    },
    // 表单验证
    checkForm() {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
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
  padding 0 px2rem(58.24)
  height 100vh
  background-color #ff3a4ed6

  // 导航栏
  .nav-bar
    height px2rem(52)
    line-height px2rem(52)

    img
      width px2rem(58.24)
      vertical-align middle

  // 标题
  .title
    color white
    margin px2rem(60) 0

    h1
      font-size px2rem(83.2)
      font-weight lighter

  .panel
    box-sizing border-box
    padding 20px 20px 80px 20px
    background-color #fff
    overflow hidden
    border-radius 10px
    position relative

    .van-field
      background-color #efefef
      margin 10px 0

    .van-field:first-of-type
      margin 5px 0 10px 0

    .btn
      text-align center
      color #fff
      font-size px2rem(31.2)

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
