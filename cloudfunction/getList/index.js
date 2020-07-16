// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  let options ={
    uri: `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${event.access_token}`,
    json: true,
    body: {
      env:'add-g8pc9',
      file_list: event.file_list
      // file_list:  JSON.stringify(event.file_list) 
    },
    headers: {
      "content-type": "application/json",
      'User-Agent': 'Request-Promise'
    },
    method: 'POST'
  }
  return await rq(options)
 
}