const $ = require('jquery')
/* import * as data from './2.js'
console.log(data.default);  */
/* const a  = require('./2.js')
console.log(a); */
/* setTimeout(()=>{
    console.log(1);
},0)
const P = new Promise((res,rej)=>{
    console.log(2);
    setTimeout(()=>{
        res()
        console.log(3);
    },0)
})
P.then(()=>{
    console.log(4);
})
console.log(5);
 */

/* $(function(){
    let callback = $.Callbacks()

    function fn1(value) {
        console.log(value);
    }
    
    function fun2(value) {
        fn1("A");
        return false;
    }
    
    callback.add(fn1) 
    callback.fire('B')     
    callback.add(fun2)    
    callback.fire('c') 
})
 */
//2 5 1 3 4

/* ((...x,xs)=>x)(1,2,3)
((x,...xs)=>x)(1,2,3) */

/* class Per {
  constructor(name){
      this.name ='xx'
  }
}
Per = class P{
    constructor(name){
        this.name ='name'
    }
}
const a  = new Per();
console.log(a.name); */
/* console.log(JSON.stringify(true)); */
/* function Foo(){
    var i =0;
    return function(){
        console.log(i++)
    }
}
var f1 = Foo()
f2 = Foo()
f1() //0
f1()  //1
f2()  //0 */
 

/* export var fir = 'x' */