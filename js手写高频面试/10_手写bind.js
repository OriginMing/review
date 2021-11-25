
var bar = function(name, age, school){
    console.log(name) // 'An'
    console.log(age) // 22
    console.log(school) // '家里蹲大学'
    console.log(this);
   }
   var foo = {
    value: 1
   };
   var result = bar.bind(foo, 'An') //预置了部分参数'An'
   result(22, '家里蹲大学') //这个参数会和预置的参数合并到一起放入bar中

   /* 开始手写 */
   Function.prototype.myBind = function(thisArg,...rest){
    let fn = this;
    return function(...innerArg){
        return fn.apply(thisArg,[...rest,...innerArg])
    }
  }
