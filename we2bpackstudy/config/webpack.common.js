const path = require('path');

  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const {
    DefinePlugin,
  } = require("webpack");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
const appDir = process.cwd(); //获取启动目录  packjson所在的目录"
console.log(appDir);  // D:\review\we2bpackstudy
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);
let isProduction = false;
const commonConfig = {
        context:path.resolve(__dirname,'../'),
        entry:'./src/index.js',//entry的相对路径是相对于context配置的路径,而非文件所在路径
        mode: "development",
        output:{
            path:path.resolve(__dirname,"../build"),
            //publicPath:'./',
            filename:"bundle.js"
        },
        module: {
            rules: [
              {
                test: /\.css$/i,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 1,
                    },
                  },
                  "postcss-loader",
                ], //我们在css中通过import引入的css不会被处理，所以需要 importLoaders:1表示 加载的时候被他前面的几个loader处理 ，这里表示一个
                //css css-loader只会处理css文件，不会插入页面中所以我们需要style-loader,loader的解析顺序从右到左，从下到上
                //style-loader通过页内样式的方式添加进来的
                //loader:'css-loader' //第一种写法
                use: [
                  "style-loader",
                  "css-loader",
                  "postcss-loader",
                  /*   {loader:'postcss-loader',
                        options:{
                            postcssOptions:{plugins:[require("autoprefixer")]}
                                }
                       } */
                ], //第二种写法
                //use:[{loader:'css-loader'}] //第三种写法
              },
              {
                test: /\.less$/i,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 2,
                    },
                  },
                  "postcss-loader",
                  "less-loader",
                ],
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                  filename:
                    "./img/[name][hash:6][ext]",
                },
                /*     parser:{
                            dataUrlCondition:{
                                maxSize: 100 * 1024
                            }
                        } */
                //parser是type为asset时需要
              },
              {
                test: /\.(woff2?|eot|ttf)$/i,
                type: "asset/resource",
                generator: {
                  filename:
                    "./font/[name][hash:6][ext]",
                },
              },
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  /*   options:{
                            presets:['@babel/preset-env'],
                           // plugins:[require('@babel/plugin-transform-arrow-functions')]
                        } */
                },
              },
            ],
          },
      
        plugins: [
            new DefinePlugin({
              BASE_haha: '"xxx"',
            }),
            new HtmlWebpackPlugin({
              title: "haha",
              template: "./src/index.html", //默认将打包后的js加载进来
            }),
            new CopyWebpackPlugin({
              patterns: [
                {
                  from: "public",
                  globOptions: {
                    ignore: [
                      "**/haha.html",
                      "**/.DS_Store",
                    ],
                  },
                },
              ],
            }),
          ],
        
}
const {merge} = require('webpack-merge')
const prodConfig = require('./webpack.prod.js')
const devConfig = require('./webpack.dev.js')
module.exports = function (env){
     isProduction  = env.production
    console.log(isProduction);
    //process.env.production = isProduction
    process.env.NODE_ENV = isProduction?"production":'development';
    //process.env.production 被赋值为udefined 会被转为string 一般js里并不会
    return isProduction ? merge(commonConfig,prodConfig):merge(commonConfig,devConfig)
}