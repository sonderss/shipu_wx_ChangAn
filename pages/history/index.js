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
    isSkeleton:false,
    bgColor:''
  },
  onPullDownRefresh: function () {
  },
  // 页面上拉触底事件的处理函数
  onReachBottom(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
    let data ={
      month:JSON.parse(options.date).month,
      day:JSON.parse(options.date).day
    }
    this.setData({
      date:data.month + '月' + data.day+'日'
    })
     if(app.globalData.historyList.length !== 0){
       console.log('本地数据')
      this.setData({
        steps:app.globalData.historyList,
        active:app.globalData.historyList.length,
        isSkeleton:true
      })
     }else{
          wx.cloud.callFunction({
            name: "method",
            data:data
          }).then(res => {
            // console.log('云函数返回的数据')
            // console.log(res)
            // console.log(res.result)
            // console.log(res.result.length)
            // let result = JSON.parse(res.result)
            // console.log(result.result)
            if (res.result === '00006' || res.result.length <= 6) {
                wx.setNavigationBarColor({
                  frontColor: '#ffffff',
                  backgroundColor: '#1e2837',
                })
                this.setData({
                  bgColor: '#1e2837',
                  isSkeleton: true
                })
                return
              }
              this.setData({
                steps: JSON.parse(res.result).result,
                active: JSON.parse(res.result).result.length,
                isSkeleton:true
              })
            app.globalData.historyList = JSON.parse(res.result).result
            })
     }
          // 正常请求http接口的业务代码
          //  getDatas.getHistory(data).then(res=>{
          //    console.log(res)
          //    if (typeof res.data !== 'object'){
          //      wx.setNavigationBarColor({
          //        frontColor: '#ffffff',
          //        backgroundColor: '#1e2837',
          //      })
          //     this.setData({
          //       bgColor: '#1e2837',
          //       isSkeleton: true
          //     })
          //     return
          //   }
          //   this.setData({
          //     steps:res.data.result,
          //     active:res.data.result.length,
          //     isSkeleton:true
          //   })
          //   app.globalData.historyList = res.data.result

          // })
        
   
     
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