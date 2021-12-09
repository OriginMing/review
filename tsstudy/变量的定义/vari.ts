let name:string = "hhah";
let age:number = 123;
let foo = 123; // 会根据赋值类型进行推导
let foo1:any = 123;  
foo1 = "xxx";
let flag:boolean = true
/* 数组 */
const names:Array<string> = ["xxx"]  //不推荐(react jsx中是有冲突   <div></div>)
const names1:number[] = [123]
/* duixiang */
let info:object = {
    name:'xxx',
    age:12
}
Object.defineProperty(info,'xxx',{
    value:'hhh',
    writable : true,
    enumerable : true,
    configurable : true
})
for (const [key, value] of Object.entries(info)) {
    console.log(`${key}: ${value}`);
  }
/* undefined null */
let setNull:null = null;
let setUndefined:undefined=undefined;
console.log(setNull,setUndefined);
/* symb */
const title1:symbol = Symbol("title")
const title2:symbol = Symbol('title')
const info2  = {
    [title1]:"CXY",
    [title2]:"LS"
}
export {}