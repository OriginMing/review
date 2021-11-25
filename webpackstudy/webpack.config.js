
console.log(111);
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./js/index.js', //入口文件
    output:{
     filename:'[name].[hash:20].js',
     path:path.resolve(__dirname,'dist')
    },
    module:{
      
    },
    devServer: {
        compress: true,
        port: 9000,
      },
      plugins:[
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            chunks: ['about'],
            filename: 'about.html'
        }),
    ]
}
