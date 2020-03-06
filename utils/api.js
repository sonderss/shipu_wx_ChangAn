const HTTP_BASE_URL = 'http://192.168.1.140/api/values/'
//  http://192.168.1.140:80/api/values/    https://way.jd.com/jisuapi/
//http://192.168.1.140/api/values/testapi?operstring=search&parameters=keyword='花生',num=20,appkey=92b0baa2be94f923de858a5c3dc77d66


//get方法
export function get(url,data,callback){
  api('GET',url,data,callback)
}
//post方法
export function post(url,data,callback){
  api('POST',url,data,callback)
}
// import { request } from './util';

// 获取数据
let app = getApp()
const getDreamData = data =>{
  return new Promise((resolve,reject)=>{
    app.get('60&key=V+3O/NEwQtv+ipKL9IkzQ23GMgTgsJeZ/px07Q',data)
    .then(res=>{
      // console.log(res)
      resolve(res)
    })
  })
   
}

module.exports = {
  // formatTime: formatTime
  getDreamData
}