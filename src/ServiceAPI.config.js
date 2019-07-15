const BASEURL = 'https://easy-mock.com/mock/5c95c5d8747db1013e6e1cbe/smileDemo/'
const LOCALURL = 'http://mall.evelance.com:1213/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index', // 商城首页所有信息
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login', // 用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 获取商品大类信息
  getSubCategoryList: LOCALURL + 'goods/getSubCategoryList', // 获取商品二级分类信息【直接获取】
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', // 获取二级分类下的商品（带分页）
  getGoodsListBySearch: LOCALURL + 'search/getGoodsListBySearch', // 通过搜索查找商品
  getCommentsListByGoodsId: LOCALURL + 'comments/getCommentsListByGoodsId', // 通过商品ID找一级评论
  addComment: LOCALURL + 'comments/addComment' // 添加评论
}

module.exports = URL
