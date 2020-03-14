// pages/history/index.js
let getDatas = require('../../utils/api');
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [],
    active: 0,
    date:'',
    isSkeleton:false
  },
  onPullDownRefresh: function () {
  },
  // 页面上拉触底事件的处理函数
  onReachBottom(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data ={
      month:JSON.parse(options.date).month,
      day:JSON.parse(options.date).day
    }
    this.setData({
      date:data.month + '月' + data.day+'日'
    })
     if(app.globalData.historyList.length !== 0){
      this.setData({
        steps:app.globalData.historyList,
        active:app.globalData.historyList.length,
        isSkeleton:true
      })
     }else{
           getDatas.getHistory(data).then(res=>{
            this.setData({
              steps:res.data.result,
              active:res.data.result.length,
              isSkeleton:true
            })
            app.globalData.historyList = res.data.result

          })
     }
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.dom = this.selectComponent('#ttt')
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

  },
  test1(emitIndex){
   // 拿到子组件传过来的值
   let index = emitIndex.detail
   wx.navigateTo({
     url:`../history-detail/index?index=${index}`
   })
  }
})
// http://zhouxunwang.cn/data/?id=36&key=Xe+U+YRgHI7+ipKL9IkzQ23GMgTgsJeZ/pxx6w&v=1.0&month=10&day=1