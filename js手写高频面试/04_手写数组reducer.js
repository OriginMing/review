Array.prototype.myReduce = function(fn,init){
   let num = init==undefined?this[0]:init  //传了init就把init作为初始值，否则就把数组第一项作为初始值
   let i  = init==undefined?1:0   //如果没有初始值就从数组下标1开始，有初始值从零开始
   for(i;i<this.length;i++){
       num = fn(num,this[i],i,this)
   }
   return num
} 
/* test */
function fn(result, currentValue, index,resouce){
    console.log(resouce);
    console.log(index);
    return result + currentValue
}
let res =  [1,2,3,4].myReduce(fn)
console.log(res);
