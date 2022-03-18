function myInstanceOF(left,right){
    while (true) {
        if(left == null){
            return false
        }else if(left.__proto__ == right.prototype){
            return true
        }
        left = left.__proto__
    }
}
let a =  myInstanceOF({},WeakMap)
console.log(a);


function mysetinterval(fn,dealy){
   function handler(){
    a=   setTimeout(()=>{
           fn()
           handler()
       },dealy)
   }
   handler();
   return {
     cancle(){
         clearTimeout(a)
     }  
   }
}
let can = mysetinterval(()=>{
    console.log(111)
},500)


function curry(fn){
    let length = fn.length;
    let res = (...Allrest)=>{
        if(length<=Allrest.length){
            return fn.call(this,...Allrest)
        }else{
          return function(...rest){
               return res.call(this,...Allrest,...rest)
          }
        }
    }
    return res
}