Function.prototype.myApply = function(thisArg){
    let obj = thisArg || window 
    obj.fn = this
    const args = arguments[1]||[] //和call唯一的不同之处在于参数为数组，
    let res = obj.fn(...args)
    delete obj.fn  
    return res
}
function f(a,b){
    console.log(a+b)
    console.log(this.name)
   }
   let obj={
    name:'wangming'
   }
   f.myApply(obj,[1,2])