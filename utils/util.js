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
const request = (option)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: option.url,
      data: option.data,
      success:(res)=>{
        console.log(res)
        resolve(res)
      },
      fail:(err)=>{
        console.log(err)
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
    

module.exports = {
  // formatTime: formatTime
  request:request,
  getTime
}
