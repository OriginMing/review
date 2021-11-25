//module.exports = {
  //  presets:[['@babel/preset-env',{
    //    targets:'last 2 version',
      //  useBuiltIns:'usage',  //useBuiltIns false 后的文件不使用polyfill来进行适配 设置polyfill ，usage 会根据源代码中出现的语言特性，自动检测所需要的polyfill；这样可以确保最终包里的polyfill数量的最小化，打包的包相对会小一些；
       // 可以设置corejs属性来确定使用的corejs的版本
       //如果我们依赖的某一个库本身使用了某些polyfill的特性，但是因为我们使用的是usage，所以之后用户浏览器可能会报错；
       //所以，如果你担心出现这种情况，可以使用 entry；
       //并且需要在入口文件中添加 `import 'core-js/stable'; import 'regenerator-runtime/runtime';
       //这样做会根据 browserslist 目标导入所有的polyfill，但是对应的包也会变大；
  //      corejs:3.8,
      /*   corejs:{
            version: "3.8", proposals: true //另外corejs可以设置是否对提议阶段的特性进行支持；
        } */
  //  }]],
 /*    plugins:[
        ["@babel/plugin-transform-runtime",{
            "corejs":3,  //同时安装@babel/runtime-corejs3
            "corejs":2  //同时安装@babel/runtime-corejs2
            "corejs":false  //同时安装@babel/runtime
        }] 
    ] */
//}
const isProduction = process.env.NODE_ENV ==='production'
const presets= [
    ['@babel/preset-env'],['@babel/preset-react']
]

const plugins = []
if(!isProduction){
  plugins.push(['react-refresh/babel'])
}else{

}
module.exports = {
    presets,
    plugins
}