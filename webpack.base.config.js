var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var precss       = require('precss');
var autoprefixer = require('autoprefixer');


module.exports = {

  entry: {
    web_app:"./src/main",
    //公共库
    vendor : [
      'q',
      'axios',
      './env', 
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync',
      'vux',
      'fastclick',
    ]
  },

  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: './'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel' ,
        query: {
          cacheDirectory: true,
          presets: ['es2015','stage-3']
        }
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader!less-loader") },
      {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
    ]
  },
  postcss: function () {
    return [
      precss,
      autoprefixer({ browsers: ['iOS 7', '> 1%', 'last 4 versions'] })
    ];
  }
}
