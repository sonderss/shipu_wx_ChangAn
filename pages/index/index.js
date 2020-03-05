//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    nickname: '',
    motto: '欢迎欢迎，热烈欢迎',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{ names: '历史的今天', icon: 'icon-lishijilu', size: '40' }, { names: '周公解梦', icon: 'icon-lishijilu', size: '40' }, { names: '影视检索', icon: 'icon-lishijilu', size: '40' }]
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
    console.log(e.detail.userInfo)
    var userInfo = e.detail.userInfo
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickname: userInfo.nickName,
      city: userInfo.city
    })
  },
  //组件回调事件
  test(e){
    let num = e.detail
    if(num === "0"){
      console.log(123)
        wx.request({
          url: 'http://zhouxunwang.cn/data/?id=60',
          data: { key: 'V+3O/NEwQtv+ipKL9IkzQ23GMgTgsJeZ/px07Q', q: '美女'},
          success:(res)=>{
            console.log(res)
          },
          fail:(err)=>{
            console.log(err)
          }
        })
    }
  }
})
