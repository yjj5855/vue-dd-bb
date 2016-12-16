var webpack = require('webpack')
var config = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config.output.filename = '[name].[hash:8].js'
config.output.chunkFilename = '[name].[hash:8].js'

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  //开发时css不打包到一个文件中,方便调试
  new ExtractTextPlugin("styles.[hash:8].css",{allChunks: true}),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "[name].[hash:8].js",
    minChunks: Infinity,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new HtmlWebpackPlugin({
    name:'index',
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body',
    chunks: ['vendor', 'web_app'],
    minify:{    //压缩HTML文件
      removeComments:true,    //移除HTML中的注释
      collapseWhitespace:false    //删除空白符与换行符
    }
  })
])

module.exports = config