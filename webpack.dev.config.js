/* 加载nodex核心模块 path */
const path = require('path');
/* 自动打开浏览器插件 */
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  // 入口文件
  entry: [
    /* 实现页面实时刷新 */
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8888',
    path.resolve(__dirname, 'src/app.js')
  ],
  // 通过webpack处理之后的输出位置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    /* 各种加载器的配置 */
    loaders: [
      /* babel加载器，处理jsx ,es6转es5 */
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/, //匹配到的文件夹目录不走这个babel-loader
        query: {
          presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
        }
      }, 
      /* eslint-loader 检查js代码 */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      /* css加载器 */
      {
        test: /\.css$/, // 匹配我们的css文件
        loader: 'style!css' // 同时运行两个loader，中间用！连接，同时用了多个loader的执行顺序是从右往左
      },
      /* sass加载器 */
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      // url加载器 把小于2kb以下的图片才会转为base64
      // name属性可以把limit值之外的图片输出到一个指定目录
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=18000&name=img/[name].[ext]' //单位是比特 1字节=8比特
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.jsx'],
  },
  /* 自动打开浏览器插件 */
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8888/', browser: 'chrome' })
  ]
};
