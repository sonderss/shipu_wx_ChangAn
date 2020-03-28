//app.js
const util  = require("utils/checkviseion");
App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser:true,
      env:'add-g8pc9'
    })
    util.checkVieson()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success:  res => {
            let data  = {
              code:res.code
            }
         wx.cloud.callFunction({
              name: "getopenid",
              data: data
            }).then( res => {
              console.log(res)
              this._openid = res.result.openid
              this.openidcall(this._openid)
              console.log(this._openid)
            }).catch(err=>{
              console.log(err)
              console.log(this._openid)
            })
      },
      fail:err=>{
        console.log('登录失败')
      }
    })
    // 获取用户信息
   wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
             success:  res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              if (this.testCallBack){
                this.testCallBack(res.userInfo)
              }
              // 更新用户信息
              const db = wx.cloud.database()
              db.collection('userInfo').where({
                _openid: this._openid
              }).update({
                data: {
                  avatarUrl: res.userInfo.avatarUrl,
                  city: res.userInfo.city,
                  country: res.userInfo.country,
                  gender: res.userInfo.gender,
                  language: res.userInfo.language,
                  nickName: res.userInfo.nickName,
                  province: res.userInfo.province,
                },
              }).then(res => {
                console.log('更新用户成功', res)
              })
              //  utils.updata(this._openid, this.globalData.userInfo)
              
            }
          })
        }
      },
      fail:err=>{
        this.globalData.userInfo = {}
      }
    })
    // console.log('app', this.globalData.userInfo)
  },
  scope_userInfo:false,
  _openid:'',
  globalData: {
    userInfo: {nickName:''},
    historyList:[],
    access_token:''
  },
  testCallBack(data){
      return data
  },
  openidcall(id){
    return id
  },
  get:function(url,data){
    console.log(url,data)
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'http://zhouxunwang.cn/data/?id=' + url,
        data: data,
        success:(res)=>{
          // console.log(res)
          resolve(res)
        },
        fail:(err)=>{
          // console.log(err)
          reject('请求错误',err)
        }
      })
    })
  }
})