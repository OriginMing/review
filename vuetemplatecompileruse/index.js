const complier = require('vue-template-compiler')
const template = '<div id="test" v-show="date">{{message}}</div>'
const result =  complier.compile(template)
console.log(result);
//  render: `with(this){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(date),expression:"date"}],attrs:{"id":"test"}},[_v(_s(message))])}`,
