// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require("request-promise")
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // let buffer = wx.getFileSystemManager().readFileSync(event.imageUrl)
  return await  cloud.openapi.security.imgSecCheck({
      media: {
        contentType: `image/${event.type}`,
        value:  Buffer.from(event.imageUrl) 
      }
    })
  // const option =  { Buffer.from(event.imageUrl) 
  //     url:`https://api.weixin.qq.com/wxa/img_sec_check?access_token=${event.access_token}`,
  //     methods:"POST",
  //     json: true,
  //     headers: {
  //       "content-type": "application/json",
  //       'User-Agent': 'Request-Promise'
  //     },
  //     formData:{
  //       media: event.imageUrl
  //     }
  // }

  // return await rq(option)
}