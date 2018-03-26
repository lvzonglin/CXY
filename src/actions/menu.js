/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import { getMenu } from '../api';

export const GET_ALL_MENU         = 'GET_ALL_MENU';
export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_NAVPATH       = 'UPDATE_NAVPATH';

export function updateNavPath(path,key){
  return {
    type:UPDATE_NAVPATH,
    payload:{
      data:path,
      key :key
    }
  }
}

export function getAllMenu(){
  return {
    type:GET_ALL_MENU,
    payload:{
      promise:getMenu()
    }
  }
}
