let a  = new Number(1) // 数字的话 只会调用valueOf(数值运算)
a.valueOf = function(){
    console.log("valueOf被调用");
}
a.toString = function(){
    console.log("toString 被调用");
}
console.log(a==1);