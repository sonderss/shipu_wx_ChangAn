// pages/main/index.js
const { getJSON } = require('../../utils/api.js')
const { getCp } = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    lazy_load:true,
    tags:[],
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  search:function(){
    
    wx.showLoading({
      title: '加载中',
    })
    var op = []      //operstring=search&parameters=keyword='花生',num=20,appkey=92b0baa2be94f923de858a5c3dc77d66
    var that = this  //operstring=detail&parameters=id=157,appkey=92b0baa2be94f923de858a5c3dc77d66
    // getJSON('testapi', { operstring: 'search', parameters:'keyword='+ that.data.inputValue, num: 20, appkey: '92b0baa2be94f923de858a5c3dc77d66' }, res => {
    //   // console.log(res.data.result.result.list)
    // })
    // getCp('testapi','operstring=search&parameters=keyword='+that.data.inputValue+',num=20,appkey=92b0baa2be94f923de858a5c3dc77d66',res=>{
    //   console.log(res.data)
    // })
    // url: 'https://way.jd.com/jisuapi/search?keyword=白菜&num=10&appkey=92b0baa2be94f923de858a5c3dc77d66'
    wx.request({
        // url: 'http://192.168.1.140/api/values/testapi?operstring=search&parameters=keyword=' + that.data.inputValue+',num=20,appkey=92b0baa2be94f923de858a5c3dc77d66',
      url: 'https://way.jd.com/jisuapi/search?keyword=' + that.data.inputValue +'&num=20&appkey=92b0baa2be94f923de858a5c3dc77d66',
        success: res=> {
          console.log(res.data)
          if (res.data.result.msg === 'ok') {
        that.setData({
          list: res.data.result.result.list
        })
        this.data.list.map((item, index) => {

          var tag = item.tag.split(',')

          if (tag.length > 3) {
            tag.splice(3, 100)

          }
          tag = tag.join('  ')

          this.data.list[index].tag = tag


          op.push(tag)
          this.setData({
            tags: op
          })

        })
      } else {
        wx.hideLoading()
        setTimeout(()=>{
          wx.showToast({
            title: '抱歉，此菜品未收录0_0',
            // icon: 'success',
            duration: 2000,
            image: '../../static/fail.png'
          })
        },500)

      }

      wx.hideLoading()

        }
    })
   
  },
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
   
  },
  cjq:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
  
})