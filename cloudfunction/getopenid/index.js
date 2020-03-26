// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let options ={
    uri: "https://api.weixin.qq.com/sns/jscode2session",
    qs: { appid: 'wx3c106149b6bcef83', secret: "ca6b5b1a911b1b8c2573648060c76ac8", js_code: event.code, grant_type:"authorization_code" },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  return await rq(options)
  console.log(options)
   .then(res=>{
     return res
   })
   .catch(err => {
     return '获取openid失败'
   })
}