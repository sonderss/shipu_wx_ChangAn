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
    list: [{ names: '历史上的今天', icon: 'icon-lishijilu', size: '40' },
      { names: '幸运数字', icon: 'icon-shuzi8', size: '40' },
      { names: '我的步数', icon: 'icon-zoulu-', size: '40' },
      { names: '上传图片', icon: 'icon-shangchuan', size: '40' }
    ],
    color:'',
    showPop:false,
    num:0,
    maxNum:5,
    closeoverlay:false,
    timer:null,
    closeable:true,
    flag:true,
    showSetNum:false,
    placeholdertxt:'设置参加人数',
    textvalue:''
    // , { names: '周公解梦', icon: 'icon-lishijilu', size: '40' }, { names: '影视检索', icon: 'icon-lishijilu', size: '40' }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.testCallBack = res =>{
      this.setData({
        userInfo: res,
      })
    }
    // // 获取accessToken
    app.accessToken = res => {
      console.log(app.globalData.access_token) 
    }
    // if (app.globalData.userInfo) {
    //   if (app.globalData.userInfo.nickName){
    //     this.setData({
    //       userInfo: app.globalData.userInfo,
    //       hasUserInfo: true
    //     })
    //   }else{
    //       // 这里是解决app里onLaunch还没执行完，该页面就执行，从而获取不到全局数据的问题
    //     app.testCallBack = res =>{
    //       // console.log(res)
    //       this.setData({
    //         userInfo: res,
    //       })
    //     }
    //   }
      
    // }
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
    if(app._openid){
         // 查找用户
         utils.searchUserInfo(app._openid)
         .then(res => {
            console.log(res)
           if (res.data.length === 0) {
             // 添加用户信息
             utils.addUserInfo(app.globalData.userInfo)
           } else {
             // 更新用户信息
             utils.updata(app._openid, userInfo)
           }
         })
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
    } else if (num === "1"){
      // 幸运数字  首先设置人数
      this.setData({ showSetNum:true})
    }else if(num === '2') {
      wx.navigateTo({
        url: `../run/index`
      })
    }else if(num === '3') {
      if (!app.scope_userInfo) {
        wx.showToast({
          title: '暂未登录，请先登录',
          icon:"none"
        })
        return
      }
        wx.navigateTo({
          url: `../images/index`
        })
    }
  },
  // 设置人数
  set_num(){
    if (!Number(this.data.maxNum)){
        this.setData({
          placeholdertxt:'请输入数字',
          showSetNum:true,
          textvalue:''
        })
        return
    }
    this.setData({ showPop: true })
  },
  // 设置最大值
  getValue(e){
    this.setData({
      maxNum:e.detail.value
    })
  },
  // 关闭弹出层
  onClose(){
    this.setData({ showPop: false, timer: clearInterval(this.data.timer), textvalue: '', num:0})
  },
  // 停止随机
  end(){
    this.setData({
      timer:clearInterval(this.data.timer),
      flag:true
    })
  },
  // 点击开始按钮，随机数字
  startRadomNum(){
    let minNum = 1 
    // 随机数字  + 随机颜色
    this.setData({
        timer: setInterval(() => {
                  let co = this.colorMe()
                  let radomnum = Math.floor(Math.random() * (this.data.maxNum*1 - minNum + 1) + minNum)
                  this.setData({ num: radomnum, color: co })
               }, 200),
        flag:false
    }) 
  },
  // 随机颜色
   colorMe() {
     let r = Math.floor(Math.random() * 255);
     let g = Math.floor(Math.random() * 255);
     let b = Math.floor(Math.random() * 255);
     let color = 'rgba(' + r + ',' +g + ',' + b + ',0.8)';
     return color
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
