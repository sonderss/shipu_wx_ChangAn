// pages/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    list:{},
    tags:[],
    activeNames: [''],
    material:[],
    process:[],
    value: 3,
    islazy:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      wx.showLoading({
        title: '加载中',
      })
   
  //  https://way.jd.com/jisuapi/search?keyword=白菜&num=10&appkey=92b0baa2be94f923de858a5c3dc77d66
      this.data.id = options.id
      var that = this
      wx.request({
        // url: 'http://192.168.1.140/api/values/testapi?operstring=detail&parameters=id=' + options.id +',appkey=92b0baa2be94f923de858a5c3dc77d66',
        url: 'https://way.jd.com/jisuapi/detail?id=' + options.id +'&appkey=92b0baa2be94f923de858a5c3dc77d66',
        success: res => {
          var num = Math.random() * (5 - 1) + 1
          num = num.toFixed(1)
          // console.log(num)
          // that.data.list = res.data.result.result
          that.setData({
            list: res.data.result.result,
            material: res.data.result.result.material,
            process: res.data.result.result.process
          })
          console.log(that.data.list)
          var a = []
          var tags = that.data.list.tag
         
          var strTag = tags.split(',')
        
          for (let i = 0; i < 3;i++){
            a.push(strTag[i]) 
          } 
          that.setData({
            tags: a,
            value:num,
           
          })
          wx.hideLoading()
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

  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  }
})