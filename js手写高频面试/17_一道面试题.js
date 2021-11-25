/* 第一种方式 */
/* global.a = 0;
var num = 0;
Object.defineProperty(global,'a',{
    get(){
        return num=num+1
    }
}) */
/* 第二种方式 */
/* var a =[1,2,3,4]
a.join = a.shift;
if(a==1&&a==2&&a==3){
    console.log(123);
} */
//数组的 ==比较 会隐式调用Array.toString()  数组的toString重写过会先调用Array.join

/* 第三种 */
/* var a = {
    num:0,
    toString:function(){
        return a.num=a.num+1
    }
}
if(a==1&&a==2&&a==3){
    console.log(123);
}
 */
/* ----------------------------------------------------------------------------------------------------------------------------- */
/* let a = 1;
(function a(){
  a = 20
})()
 */
/* console.log(a);
var a = 1 
function a(){} */
/* 
var a
a=1
function a(){
}
console.log(a) */
(function a(){a=1;console.log(a);}())






//函数和变量相比，会被优先提升。这意味着函数会被提升到更靠前的位置。
/* console.log(xxx);
var xxx=1 */
/* function c(){

}
var c
console.log(c); */

