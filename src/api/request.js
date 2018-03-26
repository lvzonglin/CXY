import axios from 'axios';

//TODO 创建axios，前置参数暂没设置
const normalAxios = axios.create();

const request = (method,url,data = {}) => {
  return new Promise(function(resolve,reject){
    normalAxios({
      method:method,
      url:url,
      data:data
    }).then((res)=>{
      const { code,data,message } = res.data
      if(res.data.code === 200){
        resolve({
          data,
          message
        })
      }else{
        reject({
          data,
          message
        })
      }
    }).catch((err)=>{
      if(err.response.status === 403){
        return window.location.href = `${location.origin}/#/login`
      }
      reject({
        message: '服务器出现错误，请联系管理员！',
        err
      })
    })
  })
}

//获取数据全用GET方法
export function get(url){
  return request('get',url)
}

//提交数据用POST方法
export function post(url,data){
  return request('post',url,data)
}
