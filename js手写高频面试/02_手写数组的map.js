Array.prototype.myMap = function(fn,thisArg) {
    let res = []
    let arr = this
    thisArg = thisArg||{}
   for(let i = 0 ;i<arr.length;i++){
     res.push(fn.call(thisArg,arr[i],i,arr))
   }
    return res
}
var obj = {
    animal: 'cats', sleepDuration: '12 and 16 hours'
  };
let result =  [1,2,3].myMap(function(item){
    console.log(this);
    return item * 2
},obj)

/*  */
/* issue：for in 会遍历到数组上手动添加到原型上的方法会出现问题  for of 不会出现，但for of 没法获得数组下标最终我们选择突通的for循环 */
/* Array.prototype.myMap = function(fn,thisArg) {
    let res = []
    let arr = this
    thisArg = thisArg||{}
   for(let i  in arr){
       console.log(arr);
     res.push(fn(arr[i]))
   }
    return res
}
let result =  [1,2,3].myMap((item)=>{
    return item * 2
})
console.log(result);
let test =  [1,2,3]
for(let i in test){
    console.log(i);
} */