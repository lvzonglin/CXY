/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  user        :null,
  loggingIn   :false,
  loggingOut  :false,
  loginErrors :null,
  logoutErrors:null
}


export default function auth(state=initialState,action={}){
  switch (action.type) {
    case LOGIN_PENDING:
      return Object.assign({},initialState,{loggingIn:true})
    case LOGIN_SUCCESS:
      let user = action.payload.data;
      //TODO 登录成功设置COOKIE
      return Object.assign({},state,{user:user,loggingIn:false,loginErrors:null})
    case LOGIN_ERROR:
      return Object.assign({},state,{loggingIn:false,user:null,loginErrors:action.payload.data.message})
    case LOGOUT_SUCCESS:
      //TODO 登出删除COOKIE
      return Object.assign({},state,{loggingOut:false,user:null,loginErrors:null})
    default:
      return state
  }
}
