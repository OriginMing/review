
//柯里化的定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。
function curry(...args){
  let handlerArgs = function(){
      args.push(...arguments)
      return handlerArgs
  }
  handlerArgs.toString = function(){
   return args.reduce((acc,curr)=>{
        return acc + curr
    })
  }
  return handlerArgs
}
console.log(curry(1)(2)(3));



 function currying(fn) {
  const length = fn.length;
  const res = (...allArgs) => {
    if (allArgs.length >= length) {
      return fn.call(this,...allArgs);//call是因为 const a = currying(add);，如果调用者传入了this那就必须保证fn执行时this指向此绑定
    } else {
      return function curry2(...args){
          //return res(args.concat(allArgs))
          return res.call(this,...args,...allArgs)
      };
    }
  };
  return res;
}
 const add = (a, b, c) => a * b + c;
 const a = currying(add);
console.log(a(1,3)(20));