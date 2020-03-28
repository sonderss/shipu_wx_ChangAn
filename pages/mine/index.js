// pages/mine/index.js
const app =  getApp();
const utils =require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      sign:'',
      show:false,
    list: [{ title: '意见反馈', url: '../feedback/index' },{ title: '联系客服', url: '' }],
      num:Number,
      sign_set_txt:'' //设置的签名信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(app.globalData.userInfo)
      wx.setNavigationBarTitle({
        title: '我的'
      })
      this.setData({
        userInfo: app.globalData.userInfo,
        num:'数据获取中...'
      })
    
    this.getData()
      
      
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  console.log(app.globalData.userInfo)
   this.setData({
     userInfo:app.globalData.userInfo
   })
    if (app.globalData.userInfo.avatarUrl){
        this.getData()
    }
    
    // this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  close(){
      this.setData({
        show: false
      })
  },
  modalinput(){
    console.log(app.scope_userInfo)
    if (!app.scope_userInfo) {
      wx.showToast({
        title: '暂未登陆，请回到首页登陆',
        icon:"none"
      })
      return
    }
    this.setData({
      show:!this.data.show
    })
  },
  // 获取输入框的值
  getValue(e){
    console.log(e.detail.value)
    this.setData({ sign_set_txt:e.detail.value})
  },
  // 修改签名
  set_sign(){
    if (this.data.sign_set_txt){
        utils.setSign(app._openid, this.data.sign_set_txt)
         .then(res=>{
            this.setData({
              sign: this.data.sign_set_txt
            })
         })
    }
  },
  getData(){
    // 判断用户是否授权
    if (app.scope_userInfo){
       console.log(app._openid)
      if (app._openid){
        this.getId()
      }else{
        this.callbackid()
      }
      
    }else{
      this.setData({
        num: ''
      })
    }
  },
  // 回调获取数据
  callbackid(){
    app.openidcall = resid => {
      if (resid) {
        utils.searchUserInfo(resid)
          .then(res => {
            console.log('查询成功', res)
            if (res.data.length > 0) {
              this.setData({
                sign: res.data[res.data.length - 1].sign
              })
            } else {
              this.setData({
                sign: "数据请求错误，请联系客服"
              })
            }
          })
        utils.getIndex(resid).then(res => {
          for (let [index, val] of res.data.entries()) {
            // console.log(val,index)
            if (val._openid === resid) {
              this.setData({
                num: index + 1
              })
            }
          }
          if (this.data.num < 100) {
            this.setData({
              num: '00' + this.data.num
            })
          }
        }).catch(err => {
          this.setData({
            num: ''
          })
        })
      } else {
        this.setData({
          sign: "签名信息错误，请联系客服",
          num: "暂无排名信息"
        })
      }
    }
  },
  // 直接获取
  getId(){
    if (app._openid) {
      utils.searchUserInfo(app._openid)
        .then(res => {
          console.log('查询成功', res)
          if (res.data.length > 0) {
            this.setData({
              sign: res.data[res.data.length - 1].sign
            })
          } else {
            this.setData({
              sign: "数据请求错误，请联系客服"
            })
          }
        })
      utils.getIndex(app._openid).then(res => {
        for (let [index, val] of res.data.entries()) {
          // console.log(val,index)
          if (val._openid === app._openid) {
            this.setData({
              num: index + 1
            })
          }
        }
        if (this.data.num < 100) {
          this.setData({
            num: '00' + this.data.num
          })
        }
      }).catch(err => {
        this.setData({
          num: ''
        })
      })
    } else {
      this.setData({
        sign: "签名信息错误，请联系客服",
        num: "暂无排名信息"
      })
    }
  }
})