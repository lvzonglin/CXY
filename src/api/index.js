/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import { post,get } from './request';
import { iotUrl } from './url'

export function postLogin(data){
  return post(iotUrl.loginUrl,data)
}

export function getLogout(){
  return get(iotUrl.logoutUrl)
}

export function getMenu(){
  return get(iotUrl.getMenuUrl)
}
