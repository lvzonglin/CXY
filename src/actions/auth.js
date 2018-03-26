import {postLogin} from '../api';

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
      //todo
    }
  }
}
