/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
export function isPromise(value){
  if(value!==null && typeof value === 'object'){
    return value.promise && typeof value.promise.then === 'function'
  }
}
