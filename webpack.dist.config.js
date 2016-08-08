const path = require('path');
const webpack = require('webpack');
/* 分离文件（css,js）*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // 入口文件
  entry: {
    app: path.resolve(__dirname, 'src/app')//,
    //vendors: ['react', 'react-dom', 'react-router']
  },
  // 通过webpack处理之后的输出位置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=18000&name=img/[name].[ext]'//单位是比特 1字节=8比特
      }
    ]
  },
  // 将entry中的vendors属性引入的依赖单独打一个包
  plugins: [
    // 分离第三方应用插件
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    // 压缩文件插件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

