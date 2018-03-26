/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./Root.prod')
}else{
  module.exports = require('./Root.dev')
}
