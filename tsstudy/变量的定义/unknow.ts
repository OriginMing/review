function foo():string{
  return "xxx"
}
function bar():number{
    return 123
}
let result:unknown
const flag = true;
if (flag) {
    result = bar()
}else{
    result = foo()
}
/* unknown第一次赋值后 还可以在次赋值不同类型的值 */
console.log(result)

/* 我们可以将null和undefined赋值给void类型，也就是函数可以返回null或者undefined
 */
function testVoid():void{
    return null
}
/* never 表示永远不会发生值的类型，
一个函数中是一个死循环或者抛出一个异常，那么写void类型或者其他类型作为返回值类型都不合适，
*/
//never目前不知其用




