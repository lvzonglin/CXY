var path = require('path');

module.exports = {
  build:{
    env:require('./prod.env'),
    index:path.resolve(__dirname,'../dist/index.html'),
    assetsRoot:path.resolve(__dirname,'../dist/'),
    assetsSubDirectory:'static',
    assetsPublicPath:'/',
    productionSourceMap:true,
    productionGzipExtensions:['js','css']
  },
  dev:{
    env:require('./dev.env'),
    port:3030,
    autoOpenBrowser:true,
    assetsSubDirectory:'static',
    assetsPublicPath:'/',
    proxyTable:{

    },
    cssSourceMap:false
  }
}
