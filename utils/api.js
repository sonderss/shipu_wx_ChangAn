const HTTP_BASE_URL = 'http://192.168.1.140/api/values/'
//  http://192.168.1.140:80/api/values/    https://way.jd.com/jisuapi/
//http://192.168.1.140/api/values/testapi?operstring=search&parameters=keyword='花生',num=20,appkey=92b0baa2be94f923de858a5c3dc77d66
function api(_methods,url,data,callback){
  wx.request({
    url: HTTP_BASE_URL+url,
    method: _methods,
    data:data,
    dataType:'json',
    success:(res)=>{
      typeof callback == 'function' && callback(res,'')
    },
    fail:(err)=>{
      console.log('请求数据失败')
      console.log(err)
      typeof callback == 'function' && callback(err,'')
    }
  })
}
function apis(_methods, url, data, callback){
  wx.request({
    url: HTTP_BASE_URL + url,
    method: _methods,
    data:data,
    dataType: 'json',
    success: (res) => {
      typeof callback == 'function' && callback(res, '')
    },
    fail: (err) => {
      console.log('请求数据失败')
      console.log(err)
      typeof callback == 'function' && callback(err, '')
    }
  })
}
//get方法
export function getJSON(url,data,callback){
  api('GET',url,data,callback)
}
//post方法
export function postJSON(url,data,callback){
  api('POST',url,data,callback)
}
// get
export function getCp(url,data,callback) {
  apis('GET',url, data, callback)
}