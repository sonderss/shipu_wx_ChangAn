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
      num:Number,
      sign_set_txt:'' //设置的签名信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(app.globalData.userInfo)
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
    if (app.scope_userInfo){
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
    console.log(this.data.show)
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
    console.log(this.data.sign_set_txt)
    if (this.data.sign_set_txt){
        utils.setSign(app._openid, this.data.sign_set_txt)
         .then(res=>{
            this.setData({
              sign: this.data.sign_set_txt
            })
         })
    }else{
      this.setData({ show: true })
    }
  },
  getData(){

    // 判断用户是否授权
    if (app.scope_userInfo){

   
      console.log(app._openid)
      // 授权
      utils.searchUserInfo(app._openid)
        .then(res => {
           console.log('查询成功',res)
          this.setData({
            sign: res.data[res.data.length - 1].sign
          })
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

    
  }else{
    this.setData({
      num: ''
    })
  }
  }
})