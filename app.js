//app.js
const util  = require("utils/checkviseion");
const utils = require('utils/checkUser');
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
              console.log(this._openid)
              // 查找用户
              utils.searchUserInfo(this._openid, this.globalData.userInfo)
              // console.log(this.globalData.userInfo)
            }).catch(err=>{
              console.log(err)
              console.log(this._openid)
              this.scope_userInfo =false
              this.globalData.userInfo = {}
            })
            
               // 获取accessToken
                wx.cloud.callFunction({
                  name: "getaccstoken"
                }).then(res => {
                  console.log(JSON.parse(res.result))
                   this.globalData.access_token = JSON.parse(res.result).access_token 
                   this.accessToken( JSON.parse(res.result))
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
                this.testCallBack(res.userInfo)
                this.scope_userInfo = true
            }
          })
        }
      },
      fail:err=>{
        this.globalData.userInfo = {}
        this.scope_userInfo = false
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
  accessToken(data){
    return data
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