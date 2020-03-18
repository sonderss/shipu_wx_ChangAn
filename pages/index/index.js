//index.js
//获取应用实例
const app = getApp();
let utils = require('../../utils/util');
Page({
  data: {
    avatarUrl: '',
    nickname: '',
    motto: '欢迎欢迎，热烈欢迎',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{ names: '历史上的今天', icon: 'icon-lishijilu', size: '40' }]
    // , { names: '周公解梦', icon: 'icon-lishijilu', size: '40' }, { names: '影视检索', icon: 'icon-lishijilu', size: '40' }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getMain:function(){
   
    wx.navigateTo({
      url: '../main/main',
    })
  },
  //获取信息
  onGotUserInfo(e) {
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    // console.log('用户信息',app.globalData.userInfo)
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickname: userInfo.nickName,
      city: userInfo.city
    })
    // console.log(app._openid)
    utils.searchUserInfo(app._openid)
      .then(res=>{
        console.log(res)
        if(res.data.length === 0){
          utils.addUserInfo(app.globalData.userInfo)
        }
    })
  },
  //组件回调事件
  test(e){
    let num = e.detail
    // 第一项为历史上的今天
    if(num === "0"){
      // let data = {q:'美女'}
      // getDatas.getDreamData(data)
      //   .then(res=>{
      //     console.log(res)
      //   })
      let time = JSON.stringify(utils.getTime()) 
      wx.navigateTo({
        url:  `../history/index?date=${time}`
      })
    }
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
