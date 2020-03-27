// pages/feedback/index.js
const app = getApp()
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImgSize:true,
    showImgToolbar: true,
    showImgResize: true,
    disabled:false,
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  getTitle(e){
    // console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },
  getConetent(e){
    const that = this
    if (!app.scope_userInfo) {
      wx.showToast({
        title: '暂未登陆，请回到首页登陆',
        icon: "none"
      })
      return
    }
    // utils.addfeedback(data)
    if (that.data.title.match(/^\s*$/)){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration:1500
      })
      return
    }
    that.editorCtx.getContents({
      success: function (res) {
        console.log(res.text)
        if (res.text.match(/^\s*$/)) {
          console.log("all space or empty")
          wx.showToast({
            title: '内容不能为空',
            icon: 'none',
            duration: 1500
          })
          return
        }
        wx.showLoading({
          title: '提交中...',
        })
        // 请求接口保存数据
        let data = {
          name: app.globalData.userInfo.nickName,
          feedback: {title: that.data.title,desc: res.html,},
          creattime: Date.now()
        }

        console.log(data)
        utils.seletfeedback(app._openid).then(res => {
          if (res.data.length === 0) {
            // 添加记录
            utils.addfeedback(data).then(res=>{
              if (res._id.length>10){
                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }).catch(err=>{
              wx.hideLoading()
              wx.showToast({
                title: '系统繁忙,稍后再试',
                icon: 'none',
                duration: 2000
              })
            })
          } else {
            // 更细记录
            utils.upfeeddata(app._openid, data.feedback)
             .then(res=>{
               wx.hideLoading()
               wx.showToast({
                 title: '提交成功',
                 icon: 'success',
                 duration: 2000
               })
             })
              .catch(err => {
                wx.hideLoading()
                wx.showToast({
                  title: '系统繁忙,稍后再试',
                  icon: 'none',
                  duration: 2000
                })
              })
          }

        })
         // wx.setStorageSync("content", res.html); // 缓存本地
      }
    })
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

  }
})