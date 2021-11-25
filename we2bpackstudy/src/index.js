//import 'normalize.css'
//import './css/less.less'
import './css/index.css'  /* 测试 postcss autoprefix、*/
const a = '123'
let c = a *  2
const image =new Image();
image.src = require('./image/dog.jpg')
let divel =  document.createElement('div')
let doc = document.getElementsByTagName('body')[0];let doc2 = document.getElementsByTagName('body')[0]
doc.appendChild(image)
divel.style.width=200 + 'px'
divel.style.height=200 + 'px'
divel.className = 'bg-image'
doc.appendChild(divel)
doc.addEventListener('click',()=>{
    console.log('hahah,测试babel/plugin','HAAHAH');
})
console.log(a,c);
import('lodash').then(res=>{
    console.log(res);
})