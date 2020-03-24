// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
const app = getApp();
const request = (option)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: option.url,
      data: option.data,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

// 获取时间
const getTime = () => {
    let t = new Date()
    let month = t.getMonth() + 1
    let day =  t.getDate()
    return {month,day}
}
// 获取access_token
//  url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential', //仅为示例，并非真实的接口地址
 // 获取图文列表
 // url:`https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=access_token`,
//  console.log(e.detail.userInfo)


const db = wx.cloud.database()
// 查询用户
const  searchUserInfo = (openid) => {
return new Promise ((resolve,reject)=>{
  db.collection('userInfo').where({
    _openid: openid
  })
  .get()
  .then(res=>{
    resolve(res)
  })
  .catch(err=>{
    reject(err)
  })
})
  
}
// 添加用户
const addUserInfo = (data) => {

  db.collection('userInfo').add({
    data:{
      avatarUrl: data.avatarUrl,
      city: data.city,
      country: data.country,
      gender: data.gender,
      language: data.language,
      nickName: data.nickName,
      province: data.province,
      openid: data._openid
    }
  }).then(res=>{
    console.log('添加用户成功',res)
  })
}

// 更新用户
const updata = (openId,data) =>{
  db.collection('userInfo').where({
    _openid: openId
  }).update({
    data: {
      avatarUrl: data.avatarUrl,
      city: data.city,
      country: data.country,
      gender: data.gender,
      language: data.language,
      nickName: data.nickName,
      province: data.province,
    },
  }).then(res=>{
    console.log('更新用户成功',res)
  })
}
module.exports = {
  // formatTime: formatTime
  request:request,
  getTime,
  addUserInfo,
  searchUserInfo,
  updata
}
