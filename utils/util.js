
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

// 时间戳转为日期格式

const getDate = (time) => {
  let t =  new Date(time * 1000)
  let year = t.getFullYear()
  let month = t.getMonth() + 1
  let day = t.getDate()
  
  return `${year}年${month}月${day}日`
}

const db = wx.cloud.database()
const _ = db.command
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

// 修改用户签名
const setSign = (id,sign) => {
  return new Promise((resolve,reject) =>{
      db.collection('userInfo').where({
        _openid: id
      }).update({
        data:{
          sign: sign
        }
      })
      .then(res=>{
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
  })
}
// 获取索引
const getIndex = async  (id) =>{
  // 获取数据总数
  const resultTotal =  await db.collection('userInfo').count()
  // console.log(resultTotal.total)
  // 判断需要几次获取  小程序一次20条 云函数是100条
  const nums = Math.ceil(resultTotal.total / 20) 
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < nums ;i++){
    const promise = db.collection('userInfo').skip(i * 20).limit(20).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}
// 查询用户反馈记录
const seletfeedback = openid =>{
  return new Promise((resolve,reject)=>{
    db.collection('feedback').where({
      _openid: openid
    }).get().then(res => {
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  }) 
}
// 添加反馈数据
const addfeedback = data => {
  return new Promise((resolve,reject)=>{
    db.collection('feedback').add({
      data: {
        name: data.name,
        creattime: data.creattime,
        feedbacks: [
          data.feedback
        ]
      }
    }).then(res => {
      // console.log(res)
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  }) 
}
// 更新记录
const upfeeddata = (openid, feedback) =>{
    return new Promise((resolve,reject)=>{
      db.collection('feedback').where({
        _openid: openid
      }).update({
          data:{
            feedbacks: _.push(feedback)
          }
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
}

module.exports = {
  // formatTime: formatTime
  request:request,
  getTime,
  addUserInfo,
  searchUserInfo,
  updata,
  setSign,
  getIndex,
  // submitfeedback,
  addfeedback,
  seletfeedback,
  upfeeddata,
  getDate
}
