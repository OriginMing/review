# loader加载的两种方式
 - 内联方式，需要的地方单独处理。eg:import 'css-loader!normalize.css'
 - 配置方式：放在module.rules中，rules属性是一个数组，里面存放一个个rule对象：对象中有多个属性，test属性：use属性：loader属性
  - test属性是对文件资源进行匹配的规则，通常设置为正则表达式
  - use属性对应的是一个数组[useEntry],useEntry是一个对象：{loader,options：可选，值是一个字符串或对象会被传到loader中,query(目前已使用options来替代)},useEntry不传递时，也可以对应一个字符串eg:use:['style-loader'],其实是Rule.use:[{loader}]的简写
  -loader属性：其实是Rule.use:[{loader}]的简写
# 关于browserslist，是一个在不同的前端工具之间，共享目标浏览器和Node.js版本的配置：
  - 根据配置查询目标浏览器，然后将这些需要适配的浏览器告诉给其他的前端工具eg:autoprefix(css加前缀),babel(js语法转换)

# 关于postcss-loader
 - 单独手写加载每一个插件是一件麻烦的事情，我们可以直接使用postcss-loader 提供给我们的预设:npm install postcss-preset-env 
  
# 关于file-loader 和 url-loader
 - file-loader的作用就是帮助我们处理import/require()方式引入的一个文件资源

 - url-loader和file-loader的工作方式是相似的，但是可以将较小的文件，转成base64的URI。开发中我们往往是小的图片需要转换，但是大的图片直接使用图片即可

asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现；
asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现；
asset/source 导出资源的源代码。之前通过使用 raw-loader 实现；
asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源
体积限制实现；
# plugin

 - clean-webpack-plugin 自动删除dist文件夹
 - html-webpack-plugin
 - DefinePlugin允许在编译时创建配置的全局常量，是一个webpack内置的插件（不需要单独安装）：
 - CopyWebpackPlugin
 在vue的打包过程中，如果我们将一些文件放到public的目录下，那么这个目录会被复制到dist文件夹中
# Babel
 - @babel/core
 比如我们需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件：
npm install @babel/plugin-transform-arrow-functions 
 - babel-loader   npm install  @babel/preset-env
# polyfill
babel7.4.0之前，可以使用 @babel/polyfill的包但是该包现在已经不推荐使用了
现在regenerator runtime和 core-js.

当编写工具时，babel更推荐我们使用一个插件： @babel/plugin-transform-runtime来完成polyfill,因为在使用我们工具时，工具库通过polyfill添加的特性，可能会污染它们的代码；
# ts
另外TypeScript的编译配置信息我们通常会编写一个tsconfig.json文件
npm install typescript -g
tsc --init
 - babel npm install @babel/preset-typescript;babel-loader在编译的过程中，不会对类型错误进行检测；
 - ts-loader  添加对应的polyfill，那么ts-loader是无能为力的；
 - 最佳实践"script":{
   "type-check":"tsc --noEmit",  //--noEmit 只编译 不输出转换出来的js
   "type-check-watch":"npm run type-check -- --watch"  //写代码用这个 完了 暂停 build
 }
# eslint
npm install eslint 
创建ESLint的配置文件：npx eslint --init
 | VSCode的ESLint插件 , 但是如果每次校验时，都需要执行一次npm run eslint就有点麻烦了，所以我们可以使用一个VSCode的插件：
ESLint
VSCode的Prettier插件
ESLint会帮助我们提示错误（或者警告），但是不会帮助我们自动修复：在开发中我们希望文件在保存时，可以自动修复这些问题；我们可以选择使用另外一个工具：prettier；
我们在编译代码的时候，也希望进行代码的eslint检测，这个时候我们就可以使用eslint-loader来完成了：use:['babel-loader','eslint-loader']


# vue加载
- vue-loader
- vue-template-compiler  //编译template
const VueLoaderPlugin = require('vue-loader/lib/plugin')
plugins:[new VueLoaderPlugin()]

# devserver
为了完成自动编译，webpack提供了几种可选的方式：
 - webpack watch 模式
 - webpack-dev-server
 - webpack-dev-middleware
 webpack --watch //方式可以监听到文件的变化，变化后生成新的文件夹，但是事实上它本身是没有自动刷新浏览器的功能的：
 npm install  webpack-dev-server    //"start": "webpack serve"
 webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中：(使用了此库memfs)
webpack-dev-middleware 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。webpack-dev-server 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置；
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const app = express()
const config = require('./webpack.config.js')
const complier = webpack(config)
app.use(webpackDevMiddleware(complier))//app.use(webpackDevMiddleware(complier,{publicPath:config.output.publicPath}))
app.listen(3000,()=>{
  console.log('启动成功')
})
# HMR
 - 模块热替换开启，但是你会发现，当我们修改了某一个模块的代码时，依然是刷新的整个页面,这是因为我们需要去指定哪些模块发生更新时，进行HMR；
 index.js中
 if(module.hot){
   module.hot.accept(摸个文件路径/数组,()=>{
     console.log("发生了更新")
   })
 }
 - React中 react-refresh  npm install @pmmmwh/react-refresh-webpack-plugin react-refresh
 const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
 修改webpack.config.js和babel.config.js文件：
 plugins:[new ReactRefreshWebpackPlugin()] //打包时需删掉
 plugins:[['react-refresh/babel']]
        
 - Vue中vue-loader，支持组件HMR
 # output的publicPath
  - 该属性是指定index.html文件打包 引用资源 的一个基本路径：
# devServer的publicPath
 它的默认值是 /，也就是我们直接访问端口即可访问其中的资源 http://localhost:8080；
 如果我们将其设置为了 /abc，那么我们需要通过 http://localhost:8080/abc才能访问到对应的打包后的资源；
  官方其实有提到，开发下建议 devServer.publicPath 与 output.publicPath相同
# devServer contentBase
默认 pack.json所在目录+/public  
比如在index.html模板中，我们需要依赖一个 haha.js 文件，这个文件我们存放在 haha文件夹中；我们需要修改contentBase:'./haha'
默认情况是项目的public文件夹下加载..   现在 不支持 contentBase换用 static.directory
devServer中还有一个可以监听contentBase发生变化后重新编译的一个属性：watchContentBase。  换用 static.watch
hotOnly是当代码编译失败时，是否刷新整个页面：如果不希望重新刷新整个页面，可以设置hotOnly为true； 新版换用 hot:true
# devServer compress
开启gzip压缩
# historyApiFallback
如果设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容；
# context
作用是用于解析入口（entry point）和加载器（loader）：
entry写上相对路径时，相对的是context的路径，context不写是
# 打包分离
多入口起点
 entry:{
   main:'./src/index.js',
   entry:"./src/testHandleEntry.js"
 },
入口依赖,如果我们单纯的进行入口分离，那么打包后的两个bunlde都有会有一份lodash和dayj如果我们单纯的进行入口分离，那么打包后的两个bunlde都有会有一份lodash
   main:{import:"./src/index.js",dependOn:"lodash"},
   lodash:'lodash',
     main:{import:"./src/index.js",dependOn:"shared"},
   shared:['lodash',"axios"],
SplitChunks实现分包
- 它是使用SplitChunksPlugin来实现的：
# HTTP压缩 （生产）
兼容的浏览器在向服务器发送请求时，会告知服务器自己支持哪些压缩格式
服务器在浏览器支持的压缩格式下，直接返回对应的压缩后的文件，并且在响应头中告知浏览器；