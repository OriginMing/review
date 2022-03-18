import {sum} from './math.js'
import _ from "lodash-es"
import "./css/base.css"
import "./css/style.less"
import {format}  from './ts/formate.ts'
import imgs from './img/xxx.jpg'
import {createApp} from 'vue'
import VueApp from './vue/test.vue'
import React from 'react'
import ReactDOM from "react-dom"
import ReactTest from './react/test.jsx'
let element =  document.createElement("img")
element.src = imgs
document.body.appendChild(element)
console.log(sum(1,2));
console.log(_.join([1,2]));
console.log(format("TWP"));
createApp(VueApp).mount("#App")
// esbuild 原生支持 jsx <ReactTest/>语法  esbuild可以代梯babel?

ReactDOM.render(<ReactTest/>,document.getElementById('react'))
