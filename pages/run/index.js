// pages/run/index.js
const app = getApp();
const { getDate } = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    userInfo:{},
    info:{},
    isSkeleton: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _self = this
    // 获取微信步数】
    wx.getWeRunData({
      success(res) {
        console.log(res)
        wx.cloud.callFunction({
          name: 'getrundata',
          data: {
            weRunData: wx.cloud.CloudID(res.cloudID)
          },
          success: data => {
            // 获取云函数返回的解密步数数据
            // getDate(time) 
            if (data.result.event.weRunData.data.stepInfoList.length > 0){
              let time = Date.now() / 1000
              data.result.event.weRunData.data.stepInfoList.map(item => {
                item.timestamp = getDate(item.timestamp)
                // timestamp
                if (getDate(time) === item.timestamp) {
                  _self.setData({
                    info: item
                  })
                }
              })
              data.result.event.weRunData.data.stepInfoList.sort(function (a, b) {
                // 从大到小排序
                return b.step - a.step
              })
              _self.setData({
                list: data.result.event.weRunData.data.stepInfoList,
                userInfo: app.globalData.userInfo,
                isSkeleton:true
              })
            }else{
              _self.setData({
                isSkeleton: false
              })
            }
          }
        })
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