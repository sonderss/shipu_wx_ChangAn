// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl:'https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay.gif?sign=940d86a2ca5a285fad18cd515de546ad&t=1595412108',
    current: 1,
    show:true
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
  // 上一步
  prv(){
      if(this.data.current === 2) {
        this.setData({
          imageurl:'https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay.gif?sign=940d86a2ca5a285fad18cd515de546ad&t=1595412108',
          current: 1
        })
      }else if(this.data.current === 3){
        this.setData({
          imageurl:'https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay2.gif?sign=5574442dfce6f3dc6995fa5d074cd59c&t=1595413090',
          current: 2
        })
      }
      // else if(this.data.current === 4){
      //   this.setData({
      //     imageurl:'https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay3.gif?sign=03ae3ebdd90dd79fd3c40399245aeaa6&t=1595405905',
      //     current: 3
      //   })
      // }
  },
  // 不知道
  noWay(){
    this.setData({
      imageurl:'https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay.gif?sign=940d86a2ca5a285fad18cd515de546ad&t=1595412108',
      current: 1
    })
  },
  // 第一步 下一步
  onenext(){
      this.setData({
        imageurl:"https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay2.gif?sign=5574442dfce6f3dc6995fa5d074cd59c&t=1595413090",
        current: 2
      })
  },
  // 第二步  下一步
  twonext(){
      this.setData({
        imageurl:"https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay3.gif?sign=05b68bf2e3dd9713e44648f7552cbd8f&t=1595466589",
        current: 3
      })
  },
  // 第三步 下一步
  threenext(){
    this.setData({
      imageurl:"https://6164-add-g8pc9-1301574324.tcb.qcloud.la/img/payback/pay4.gif?sign=a02f1c362ee16bd34a7b60501511750b&t=1595467483",
      current: 4
    })
  },
  // 最后一步  进入会话
  fournext(){
      
  },
  onClickHide() {
    this.setData({ show: false });
  }
})