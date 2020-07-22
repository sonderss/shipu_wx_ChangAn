// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

    console.log("event",event)
    console.log("context",context)
    if(event.Content === '打赏'){
      const fileID = 'cloud://add-g8pc9.6164-add-g8pc9-1301574324/img/payImage/pay.gif'
      const res = await cloud.downloadFile({
        fileID: fileID,
      })
      const buffer = res.fileContent
      const  mid = await cloud.openapi.customerServiceMessage.uploadTempMedia({
        type: 'image',
        media: {
          contentType: 'image/png',
          value: buffer
        }
      })
      try {
        await cloud.openapi.customerServiceMessage.send({
          touser: wxContext.OPENID,
          msgtype: 'text',
          text: {
            content: '长按识别二维码，给钱！',
          }
        })
        const result =  await cloud.openapi.customerServiceMessage.send({
           touser: wxContext.OPENID,
           msgtype: 'image',
           image: {
               mediaId: mid.mediaId
           },
         })
         return result
       } catch {
         await cloud.openapi.customerServiceMessage.send({
           touser: wxContext.OPENID,
           msgtype: 'text',
           text: {
             content: '打赏码错误，再见',
           }
         })
       }
    }else{
      await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
          content: '收到',
        }
      })
    }
  return 'success'
}