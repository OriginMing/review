const path = require("path");
const {
  CleanWebpackPlugin,
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  DefinePlugin,
} = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//默认为webpack.config.js 修改了名字的话，需要 webpack --config newname
module.exports = {
  //context:path.join(__dirname,'../'),
  entry: "./src/index.js", //webpack不配置的情况下默认此位置
 /* entry:{
   main:{import:"./src/index.js",dependOn:"shared"},
   shared:['lodash',"axios"],
   entry:"./src/testHandleEntry.js"
 }, */
  mode: "development",
  //watch:true,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(
      __dirname,
      "dist"
    ),//文件输出目录
    //publicPath:'',//默认 /,vue默认用的 /,
    // assetModuleFilename:'./img/[name][hash:6][ext]'  //对应资源文件的输出路径 第一种
  },
  optimization:{
    splitChunks:{
      chunks:'all',
      cacheGroups:{
        vendor:{
          test:/[\\/]node_modules[\\/]/,
          filename:"vendors.js",
          chunks:'all'
        }
      }
    }
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
  devServer:{
    hot:true,//模块热替换开启，但是你会发现，当我们修改了某一个模块的代码时，依然是刷新的整个页面：
    static:{
      directory:path.join(__dirname, './public')
    },
    historyApiFallback:false,
  },
  plugins: [
    new DefinePlugin({
      BASE_haha: '"xxx"',
    }),
    new CleanWebpackPlugin(),
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
};



