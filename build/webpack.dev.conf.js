var webpack = require('webpack');
var utils   = require('./utils');
var config  = require('../config');
var merge   = require('webpack-merge');
var baseWebpackConfig    = require('./webpack.base.conf');
var HtmlWebpackPlugin    = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

Object.keys(baseWebpackConfig.entry).forEach(function(name){
  baseWebpackConfig.entry[name] = ['react-hot-loader/patch','./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig,{
  module:{
    rules:utils.styleLoaders({
      sourceMap:config.dev.cssSourceMap
    })
  },
  mode:"development",
  devtool:"#cheap-module.eval-source-map",
  plugins:[
    // 编译时配置的全局变量  设置为开发环境
    new webpack.DefinePlugin({
      'process.env':config.dev.env
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    //不触发错误，既编译后运行的包正常运行
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:'index.html',
      inject:true
    }),
    new FriendlyErrorsPlugin()
  ]
})
