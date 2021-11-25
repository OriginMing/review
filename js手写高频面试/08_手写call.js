Function.prototype.myCall = function(thisArg){
    let obj = thisArg || window //不传绑定window
    obj.fn = this//this是执行的函数
    const args = [...arguments].slice(1)
    let res = obj.fn(...args)
    delete obj.fn  // 不删除会导致属性越来越多
    return res
}
function f(a,b){
    console.log(a+b)
    console.log(this.name)
   }
   let obj={
    name:'wangming'
   }
   f.myCall(obj,1,2)