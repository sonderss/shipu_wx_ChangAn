//index.js
//获取应用实例
const app = getApp();
let utils = require('../../utils/util');
Page({
  data: {
    motto: '欢迎欢迎，热烈欢迎',
    userInfo: { nickName:''},
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
    console.log(app._openid)
    if (app.globalData.userInfo) {
      if (app.globalData.userInfo.nickName){
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }else{
          // 这里是解决app里onLaunch还没执行完，该页面就执行，从而获取不到全局数据的问题
        app.testCallBack = res =>{
          // console.log(res)
          this.setData({
            userInfo: res,
          })
        }
      }
      
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          app.scope_userInfo = true
        }
      }
    })
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
    let userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    // console.log('用户信息',app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      city: e.detail.userInfo
    })
    app.globalData.userInfo = userInfo
    app.scope_userInfo = true
    app.openidcall = res=>{
      // console.log(res)
      if (res) {
        // 查找用户
        utils.searchUserInfo(app._openid)
          .then(res => {
            // console.log(res)
            if (res.data.length === 0) {
              // 添加用户信息
              utils.addUserInfo(app.globalData.userInfo)
            } else {
              // 更新用户信息
              utils.updata(app._openid, userInfo)
            }
          })
      }
    }
    
  },
  //组件回调事件
  test(e){
    let num = e.detail
    // 第一项为历史上的今天
    if(num === "0"){
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
