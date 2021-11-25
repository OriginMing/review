let myInstanceOf = (target,origin)=>{
   while(target){
       if(target.__proto__==origin.prototype){
           return true
       }
       target = target.__proto__
   }
   return false
}

/* test */
let a = []
console.log(myInstanceOf(a,Array));
console.log(myInstanceOf(a,Map));