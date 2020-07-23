// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  return await cloud.openapi.img.aiCrop({
    imgUrl: event.imgurl,
    ratios:"0.56"
  })
}