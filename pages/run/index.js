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
    isSkeleton: false,
    isLoading:true,
    isDesc:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.test()
  },
 test(){
   const _self = this
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.werun']) {
        wx.authorize({
          scope: 'scope.werun',
          success () {
             console.log(12312312132)
          },
          complete: c => {
            console.log(c)
            if(c.errMsg === "authorize:fail:auth deny"){
              _self.gteAuth()
            }
          }
        })
      }
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
    if(this.data.list.length <= 0){
      this.getData()
    }
    
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
  // 获取微信步数
  getData(){
    let _self = this
    _self.setData({
      isLoading:true
    })
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
                isSkeleton:true,
                isDesc:false,
                isLoading:false
              })
            }else{
              _self.setData({
                isSkeleton: false,
                isDesc:false,
                isLoading:false
              })
            }
          }
        })
      },
      fail:err => {
        console.log(err)
        if(err.errMsg === 'getWeRunData:fail:auth deny'){
          _self.setData({
            isDesc:true,
            isLoading:false
          })
        }
      }
    }) 
  },
  // 获取权限
  gteAuth(){
    const _self = this
    wx.getSetting({
      success (res) {
        console.log(res.authSetting["scope.werun"])
        if(!res.authSetting["scope.werun"]){
            // 没有权限 -》获取运动步数权限
            console.log("获取权限")
            wx.showModal({
              title: '提示',
              content: '允许获取微信步数权限',
              success (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => { 
                      console.log(res)
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  _self.setData({
                    isLoading:false,
                    isDesc:true
                  })
                  return true
                }
              }
            })
        }
      }
    })
  }
})