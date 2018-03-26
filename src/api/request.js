/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import axios from 'axios';
import queryString from 'query-string';

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
      // if(err.response.status === 403){
      //   return window.location.href = `${location.origin}/#/login`
      // }
      console.log(err)
      reject({
        message: '服务器出现错误，请联系管理员！',
        err
      })
    })
  })
}

//获取数据全用GET方法
export function get(url,data){
  const urlStr = queryString.stringify(data)
  return request('get',`${url}?${urlStr}`)
}

//提交数据用POST方法
export function post(url,data){
  return request('post',url,data)
}
