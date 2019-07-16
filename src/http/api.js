/* eslint-disable no-proto */
import axios from 'axios'
import config from './config'
import qs from 'qs'
import router from '@/router'
import storage from '@/utils/storage'
import store from '@/store'

import { Toast } from 'vant'

// 使用 vuex 做全局 loading 时使用
// import store from '@/store'

// 错误码
const ERR_OK = 0

export default function request(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function(data) {}]
    })

    // request 拦截器
    instance.interceptors.request.use(config => {
      // 1. loading 动画
      store.commit('showLoading')
      // 2. 带上token
      const token = storage.get('token')
      console.log(token)
      if (token.length > 0) {
        config.headers.Authorization = token
      }
      // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
      if (config.method === 'post') {
        if (config.data.__proto__ === FormData.prototype ||
          config.url.endsWith('path') ||
          config.url.endsWith('mark') ||
          config.url.endsWith('patchs')
        ) {
          // TODO: 处理FormData
        } else {
          config.data = qs.stringify(config.data)
        }
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    // response 拦截器
    instance.interceptors.response.use(response => {
      // 停止loading
      store.commit('hideLoading')
      // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
      if (response.data === undefined) {
        response.data = JSON.parse(response.request.responseText)
      }
      return response
    }, error => {
      // 停止 loading 动画
      store.commit('hideLoading')
      const { status } = error.response
      if (status === 401) {
        Toast.fail('token值无效，请重新登录')
        // 清除token
        localStorage.removeItem('token')
        // 页面跳转
        router.push('/login')
      } else {
        Toast.fail(error.response.data.message)
      }

      return Promise.reject(error)
    })

    // 请求处理
    instance(options).then(res => {
      const { code, data } = res.data
      if (code === ERR_OK) resolve(data)
    }).catch(error => reject(error))
  })
}
