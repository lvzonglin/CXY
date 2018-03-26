var path    = require('path');
var utils   = require('./utils');
var config  = require('../config');

function resolve(dir){
  return path.join(__dirname,'..',dir)
}

module.exports = {
  entry:{
    app:'./src/index.jsx'
  },
  output:{
    //输出目录的绝对路径
    path:config.build.assetsRoot,
    //导出文件的文件名
    filename:'[name].js',
    //生产模式或开发模式下html、js等文件内部引用的公共路径
    publicPath:process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve:{
	   //自动解析确定的拓展名，使导入模块时不带拓展名
     extensions:['.js','.jsx','.json'],
     //创建import或require的别名
     alias:{
       '@':resolve('src')
     }
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        loader:'babel-loader',
        include:resolve('src')
      },
      {
        test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader:'url-loader',
        options:{
          limit:10000,
          name:utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader:'url-loader',
        options:{
          limit:10000,
          name:utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
