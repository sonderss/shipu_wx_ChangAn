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
                   this.globalData.access_token_time =  Math.floor(Date.now() / 1000 ) + JSON.parse(res.result).expires_in // 时间戳 单位 s
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
  list: [{ names: '历史上的今天', icon: 'icon-lishijilu', size: '40' },
    { names: '幸运数字', icon: 'icon-shuzi8', size: '40' },
    { names: '我的步数', icon: 'icon-zoulu-', size: '40' },
    { names: '上传图片', icon: 'icon-shangchuan', size: '40' }
  ],
  globalData: {
    userInfo: {nickName:''},
    historyList:[],
    access_token:'',
    access_token_time:''
  },
  testCallBack(data){
      return data
  },
  accessToken(data){
    return data
  },
  getListIndex(){
      return new Promise((resolve,reject) => {
        if(this._openid  === 'od82Q4gz-ubMfvb0AKM5Nq2Oqp08' || this._openid  === 'od82Q4sem6TjaCEM5oaDv52zo8qA'){
          let arr = [ { names: '单反相机', icon: 'icon-shuma-danfan', size: '40' },{ names: '', icon: '', size: '40' }]
          // this.setData({
          //   list: this.list.concat(arr)
          // })
          this.list =  this.list.concat(arr)
           resolve( this.list )
          console.log('this.list',this.list)
        }
        reject([])
      })
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