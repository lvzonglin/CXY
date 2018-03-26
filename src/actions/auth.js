/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import {postLogin,getLogout} from '../api';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR   = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function login(user,password,authCode){
  return {
    type:'LOGIN',
    payload:{
      promise:postLogin({
        user:user,
        password:password
      })
    }
  }
}

export function logout(){
  return {
    type:'LOGOUT',
    payload:{
      promise:getLogout()
    }
  }
}
