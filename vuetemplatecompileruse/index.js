const complier = require('vue-template-compiler')
const compiler3 = require('@vue/compiler-sfc')
const template = '<div id="test" v-show="date">{{message}}</div>'
//const result =  complier.compile(template)
const result3 =compiler3.compileTemplate(template)
console.log(result3);
//console.log(result);
    // "vue-template-compiler": "^2.6.14"

//  render:
// `with(this){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(date),expression:"date"}],
//attrs:{"id":"test"}},[_v(_s(message))])}`,

//vue3不用vue-template-compiler了，用的@vue/compiler-sfc，注意目前安装vue-loader要指定16以上的版本，默认安装的最新版本不行的