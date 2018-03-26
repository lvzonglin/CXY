var webpack = require('webpack');
var path    = require('path');
var utils   = require('./utils');
var config  = require('../config');
var merge   = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

var webpackConfig = merge(baseWebpackConfig,{
  module:{
    rules:utils.styleLoaders({
      sourceMap:config.dev.cssSourceMap,
      extract:true
    })
  },
  mode:"production",
  devtool:config.build.productionSourceMap ? '#sourceMap' : false,
  output:{
    path:config.build.assetsRoot,
    filename:utils.assetsPath('js/[name].bundle.[chunkhash].js'),
		chunkFilename:utils.assetsPath('js/[name].chunk.[chunkhash].js')
  },
  //TODO 
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'IOTK',
          chunks: 'all',
          minChunks: 1,
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          chunks: "all"
        }
      }
     }
  },
  plugins:[
    //配置全局环境为生产环境
    new webpack.DefinePlugin({
      'process.env':env
    }),
    //将js中引入的css分离的插件
    new ExtractTextPlugin({
      filename:utils.assetsPath('css/[name].[contenthash].css')
    }),
    //压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCSSPlugin({
      cssProcessorOptions:{
        safe:true
      }
    }),
    new HtmlWebpackPlugin({
      filename:process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template:'index.html',
      inject:true,
      minify:{
				removeComments:true,//删除html中的注释代码
				collapseWhitespace:true, //删除html中的空白符
				removeAttributeQuotes:true //删除html元素中属性的引号
			},
			chunksSortMode:"dependency"
    })
  ],
})

module.exports = webpackConfig
