var path   = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function(_path){
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory,_path)
}

exports.cssLoaders = function(options){
  var options = options || {};
  var cssLoaders = {
    loader:'css-loader',
    options:{
      //生成环境下压缩文件
      minimize:process.env.NODE_ENV === 'production',
      //根据参数是否生成sourceMap文件
      sourceMap:options.sourceMap
    }
  }

  function generateLoader(loader,loaderOptions){
    var loaders = [cssLoaders]
    if(loader){
      loaders.push({
        loader:loader+'-loader',
        options:Object.assign({},loaderOptions,{
          sourceMap:options.sourceMap
        })
      })
    }

    if(options.extract){
			//ExtractTextPlugin分离js中引入的css文件
			return ExtractTextPlugin.extract({
				use:loaders,
				fallback:'style-loader'
			})
		}else{
			return ['style-loader'].concat(loaders)
		}
  }

  return {
    css:generateLoader(),
    postcss:generateLoader,
    less:generateLoader('less')
  }
}

exports.styleLoaders = function(options){
  var output = [];
  var loaders = exports.cssLoaders(options);

  for(var extension in loaders){
    var loader = loaders[extension]
    output.push({
      test:new RegExp('\\.' +extension + '$'),
      use:loader
    })
  }

  return output
}
