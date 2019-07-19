export default {
  method: 'get',
  // url前缀
  baseURL: process.env.NODE_ENV === 'production'
    ? 'http://mall.evelance.cn:7001/'
    : 'http://localhost:7001/',
  // ↑手机上调试记得把地址改为你电脑ip，例如：http://192.168.31.252:7001/↑
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
