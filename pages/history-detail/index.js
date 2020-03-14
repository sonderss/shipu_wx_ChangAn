// pages/history-detail/index.js
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      data:{}
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    // console.log(app.globalData.historyList[options.index])
    let obj = {}
    // 这里直接给OBJ对象赋值，会改变原对象，所以使用Object.assign(target,yuanData)来解决该问题
    Object.assign(obj,app.globalData.historyList[options.index]) 
    let time = '<br />' + '(' +  obj.year +'年' + obj.month +'月' + obj.day +'日' + ')'
    obj.des += time
    this.setData({
      data:obj
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