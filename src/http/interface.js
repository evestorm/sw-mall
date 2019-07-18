import axios from './api'

const GET = 'get'
const POST = 'post'

// 注册
const postRegister = data =>
  axios({ url: 'register', method: POST, data })
// 登录
const postLogin = data =>
  axios({ url: 'login', method: POST, data })
// 上传图片
const uploadImg = data =>
  axios({ url: 'upload', method: POST, data })
// 获取用户信息
const getUserInfo = () =>
  axios({ url: 'user', method: GET })
// 更新个人信息（用户名，头像）
const updateUserInfo = data =>
  axios({ url: 'updateUserInfo', method: POST, data })
// 商城首页所有信息
const getShoppingMallInfo = () =>
  axios({ url: 'index', method: GET })
// 商品分类信息
const getCategory = () =>
  axios({ url: 'admin/category', method: GET })
// 获取二级分类下的商品（带分页）
const getGoodsListByCategorySubID = (data) =>
  axios({ url: 'goods/list', method: POST, data })
// 商品详情
const getGoodsDetail = (ID) =>
  axios({ url: `goods/detail/${ID}`, method: GET })
// 商品搜索
const getGoodsListBySearch = data =>
  axios({ url: 'getGoodsListBySearch', method: GET, data })
// 通过商品ID找一级评论
const getCommentsListByGoodsId = data =>
  axios({ url: 'comments/list', method: POST, data })
// 添加评论
const addComment = data =>
  axios({ url: 'comments/addComment', method: POST, data })

export default {
  postRegister,
  postLogin,
  uploadImg,
  getUserInfo,
  updateUserInfo,
  getShoppingMallInfo,
  getCategory,
  getGoodsListByCategorySubID,
  getGoodsDetail,
  getGoodsListBySearch,
  getCommentsListByGoodsId,
  addComment
}
