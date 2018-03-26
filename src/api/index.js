import { post,get } from './request';

const URL = {
  login:'http://rap2api.taobao.org/app/mock/8228/POST/login',
  logout:'http://rap2api.taobao.org/app/mock/8228/POST/logout',
  getMenu:'http://rap2api.taobao.org/app/mock/8228/GET/getMenu'
}

export function postLogin(data){
  return post(URL.login,data)
}

export function getMenu(){
  return get(URL.getMenu)
}
