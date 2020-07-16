// pages/images/index.js
const app = getApp()
const {uoLoadImages,userImages,delImage} = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
       imagesList:[],
       privesrc:[],
       current:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
        title: '加载中',
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
  // 上传图片
  upLoadFile(){
    const _self = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        wx.showLoading({
          title: '上传中',
        })
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.map( item => {
            wx.cloud.uploadFile({
              cloudPath: "img/" + new Date().getTime() +"-"+ Math.floor(Math.random() * 1000),
              filePath:item
            }).then(res => {
              console.log(res)
              console.log(app._openid)
              if(app._openid){
                uoLoadImages(app._openid,res.fileID).then(res => {
                  // 上传成功 
                  _self.getData()
                 
                }).catch(err => {
                    wx.showToast({
                      title: '上传失败',
                      icon: 'warn',
                      duration: 2000
                    })
                    setTimeout(function () {
                      wx.hideLoading()
                    }, 2000)
                })
              }
              
            }) 
        })
      }
    })
  },
  // 预览图片
  prvimage(url){
    wx.previewImage({
      current: url.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.privesrc
    })
  },
  // 获取图床数据
  getData(){
    userImages(app._openid).then(res => {
      console.log(res)
      if(res.data.length === 1 && res.data[0].fileids.length >= 1){
        let arr = []
        res.data[0].fileids.map(item => {
           let obj = {fileid:item,max_age:7200}
           arr.push(obj)
        })
        console.log(arr)
        wx.cloud.callFunction({
          name: "getList",
          data: {
            access_token: app.globalData.access_token,
            file_list: arr
          }
        }).then(result => {
          console.log(result)
          this.setData({
            imagesList:result.result.file_list
          })
          result.result.file_list.map(item => {
              this.data.privesrc.push(item.download_url)
          })
          wx.hideLoading()
        })
      }else{
         // 该用户图床没有数据
         wx.showToast({
            title: "图床啥也没有0.0",
            icon: 'none',
            duration: 2000
        })
        setTimeout(() => {
          wx.hideLoading()
        },2000)
        
      }
    })
  },
  // 显示删除图片按钮
  delItem(e){
    this.setData({
      current:e.currentTarget.dataset.index
    })
  },
  // 删除图片
  del(e){
    let arr = []
    arr.push( this.data.imagesList[e.currentTarget.dataset.index].fileid)
    console.log("arr",arr)
    this.data.imagesList.splice(e.currentTarget.dataset.index,1)
    let newArrimagesList = this.data.imagesList
    this.data.privesrc.splice(e.currentTarget.dataset.index,1)
    let newArrprivesrc = this.data.privesrc
    this.setData({
      imagesList: newArrimagesList,
      privesrc:newArrprivesrc,
      current: null
    })

    // 数据库删除文件ID
    delImage(app._openid,arr[0])

    // 云存储删除文件
    wx.cloud.callFunction({
      name:"delimage",
      data:{
        access_token:app.globalData.access_token,
        file_list: arr
      }
    }).then(res => {
      // 云存储删除成功
      if(res.result.delete_list.length === 1){
        wx.showToast({
          title: '删除成功',
          icon:"none",
          duration:2000
        })
      }
    }).catch(err => {
      // 删除失败
      wx.showToast({
        title: '删除失败',
        icon:"none",
        duration:2000
      })
    })
    // 删除列表中的image
    // 删除数据库中对应的item 
  },
  // 监听页面点击事件，隐藏删除按钮
  listenTap(e){
    if(e.target.id !== "delImage"){
      this.setData({
        current: null
      })
    }
  }
})