/* compose 函数的作用就是组合函数的，将函数串联起来执行，将多个函数组合起来，一个函数的输出结果是另一个函数的输入参数 */
function test1(x){
    console.log("test1",x);
    return 2+x
}
function test2(arg){
    console.log("test2",arg);
   return arg+10
}
function test3(arg){
    console.log("test3",arg);
    return arg+7
}
const a = compose(test1,test2,test3);
console.log(a(1));
/* compose函数实现 */
/* function compose(...rest){
    return rest.reduce(
        function(pre, cur){
          return  function(...args){
                return pre(cur(...args))
             }
        }
      );
} */
function compose(...fn){
   return fn.reduce((pre,cur)=>(...args)=>cur(pre(...args)))
}
function compose(...fn){
    return fn.reduce((pre,cur)=>(...args)=>pre(cur(...args)))
}
/* 
 */
/* function first(...args){
  return test1(test2(...args))
}
function second(...args){
  return first(test3(...args))
}
second(1) */