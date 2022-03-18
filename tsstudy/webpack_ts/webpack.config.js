const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require("clean-webpack-plugin");
module.exports = {
    mode:'development',
    entry:'./src/main.ts',
    output:{
     path:path.resolve(__dirname,'./dist'),
     filename:"bundle.js",
     publicPath:'./'   
    },
    resolve:{
        extensions:[".ts",".js",".cjs",".json"],
    },
    devServer:{
        
    },
    module:{
        rules:[
            {
            test:/\.ts$/,
            loader:'ts-loader'
           }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ]
}