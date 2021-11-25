const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const path = require('path');
console.log('dev');
  module.exports = {
    mode:'development',
    devServer:{
        hot:true,//模块热替换开启，但是你会发现，当我们修改了某一个模块的代码时，依然是刷新的整个页面：
        static:{
          directory:path.join(__dirname, '../public')
        },
        historyApiFallback:false,
      },
    plugins:[new ReactRefreshWebpackPlugin({}) ]
} 