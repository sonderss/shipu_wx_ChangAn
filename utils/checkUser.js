
// 查询用户
const searchUserInfo = (openid,data) => {
  const db = wx.cloud.database()
  const _ = db.command
  console.log(openid)
    db.collection('userInfo').where({
      _openid: openid
    })
      .get()
      .then(res => {
        console.log('user',res)
        if(res.data.length === 0){
          // 添加用户
            db.collection('userInfo').add({
              data: {
                avatarUrl: data.avatarUrl,
                city: data.city,
                country: data.country,
                gender: data.gender,
                language: data.language,
                nickName: data.nickName,
                province: data.province,
                openid: data._openid
              }
            }).then(res => {
              console.log('添加用户成功', res)
            })
            .catch(err =>{
              console.log('添加用户失败',err)
            })
        }else if(res.data.length === 1){
            db.collection('userInfo').where({
              _openid: openid
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
            }).then(res => {
              console.log('更新用户成功', res)
            }).catch(err=>{
              console.log('更新用户失败', err)
            })
            
        }
      })
      .catch(err => {
        console.log('user', err)
       
      })
}

module.exports = {
  searchUserInfo
}