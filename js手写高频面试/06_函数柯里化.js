
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
 console.log(curry(1)(2)(3).toString());
