// 云函数入口文件
const cloud = require('wx-server-sdk')
// const got = require('got');
const rq = require('request-promise')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 这里是获取历史上的今天接口
  return await rq('http://zhouxunwang.cn/data/?id=36&key=Xe+U+YRgHI7+ipKL9IkzQ23GMgTgsJeZ/pxx6w&v=1.0&month=' + event.month + '&day=' + event.day)
   .then(res=>{
     return res
   })
   .catch(err=>{
     return '数据请求失败'
   })
}