#### 浏览器内核（排版引擎、浏览器引擎、页面渲染引擎）

```js
Gecko:早期被Netscape和Mozilla Firefox浏览器使用
Trident:微软开发，被IE4-IE11浏览器使用，但是Edge已经转向Blink;
Webkit:苹果基于KHTML开发，用于Safari，Chrome之前也使用；
Blink:是Webkit的一个分支，Google开发，目前应用于Chrome、Edge、Opera等等；
```

### js的执行

```
js引擎帮助我们将js代码翻译成CPU指令让CPU执行。
js引擎(V8（Blink） 、JavaScriptCore(webkit))
```

### V8引擎

```
C++编写   https://www.processon.com/diagraming/61bae8fc07912930a0702d74
```

### GlobalObject

```
源代码到抽象语法树的过程就生成了GlobalObject，放入执行上下文中
var name = "wangming"
foo()
function foo(){}
var GlobalObject = {
 String:"类",
 Date:"类"，
 settimeout:"函数"，
 window:GlobalObject,
 等等很多js本身拥有的东西
 name:"undefined",
 foo:函数内存地址
}
//等到真正运行的时候
V8为了执行代码，V8引擎内部会有一个执行上下文栈（函数调用栈）
全局代码没有放在函数里，为了能够执行全局代码，会创建一个全局执行上下文（全局代码需要执行时才会创建）
全局执行上下会放入执行上下文栈，全局执行上下文的VO就是GO对象
```

### 编译过程遇到函数

```
会在内存开辟一个空间存储函数foo  0xa00（地址）
[[scope]]：parent scope 包含存储父级作用域 和 函数的执行体
执行时会在执行上下文栈中创建 函数执行上下文包含（VO:AO）和scope chain(VO+Parent scope)AO里就是函数体里的一些变量，
函数中所有语句执行完出栈

变量查找规则，当在当前AO中查找不到时就在查找scope chain上的parent scope 依次往上直到查找到或scope chain的尽头为止.


函数体里的变量开始编译，是在该函数被调用执行时，放到执行上下文栈顶，执行结束后，并且从根对象出发没有东西再指向此VO:AO时，那么对应的VO：AO也会销毁，对于形成闭包的eg:  foo(){ return foo1(){} }  let a = foo();
像这样的 foo1函数的scope chain 上的 parent scope指向了 foo，且全局的a指向了foo1，那么 foo的VO:AO不会被销毁,因为 从a出发->foo1，foo1的parent scope->foo, foo就不会销毁，除非函数调用结束后 令 a=null



```

![image-20211216202834196](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20211216202834196.png)

![image-20211216203526481](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20211216203526481.png)

### 不声明直接使用

```
function foo(){
  xxx='222'//这个js引擎认为是全局的放在全局中
  var m = 100;//这个会加入foo的AO
};
foo()
console.log(xxx) //222
```

### 闭包

```
编译过程遇到函数
```

### 闭包导致的内存泄漏案例

```
function createfnArray(){
 var arr = new Array(1024*1024).fill(1) //用1填充长度为1021*1024长度的数组
 //此数组占多大空间呢
 //1 为小整数  在v8占据4个字节（4byte）   4*1024*1024 = 4M   4byte * 1024 = 4kb 4kb*1024 = 4M
 return function(){
 console.log(arr.length)
 }
}
var arrFn = []
for(var i = 0;i<100;i++){
  arrFn.push(createfnArray())
}
```

![image-20211217124412238](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20211217124412238.png)

### 关于this

```
1.默认绑定 foo(){}独立函数调用 默认window 
2.隐式绑定
3.显式绑定
4.new绑定
总结：和所处位置无关、只和调用有关，谁调用它就指向谁，默认绑定相当于window.发起调用
```

```
function foo1(){
console.log(this) //window
}
function foo2(){
console.log(this)//window
foo1()
}
foo2()



var obj = {
name:"why",
foo:function(){
console.log(this) //window
}
}
var bar = obj.foo
bar()
```

```
//隐式绑定
var obj = {
name:"why",
foo:function(){
console.log(this) //obj
}
}
obj.foo()  //
```

```
//显示绑定
fn.call(this,arg,arg,arg)
fn.apply(this,[args])
let newfn =  fn.bind(this)  //bind返回一个新函数，这个新函数的this被显示绑定了，传参传在哪里都可以
function a(sum,sum1,sum2){
  console.log(sum+sum1+sum2)
}
let fn = a.bind("xxx",1,2)
fn(1,2,3) 
```

```
//new 绑定

```

### 绑定的优先级

```
显示大于隐式
bind 返回的函数，无法用apply和call改变this
但是可以通过 new Bind返回的函数() 来改变新函数的指向
function foo(something) {
    this.a = something
}
var obj1 = {}
var bar = foo.bind(obj1)  // 返回一个新函数bar，这个新函数内的this指向了obj1  (1)
bar(2) // this绑定在了Obj1上，所以obj1.a === 2
console.log(obj1.a)
var baz = new bar(3)  // 调用new 操作符后，bar函数的this指向了返回的新实例baz  (2)
console.log(obj1.a)
console.log(baz.a) 
```

### 特殊的绑定（间接函数引用）

```
(obj2.bar=obj.foo)()  //属于独立的函数调用 
```

### 箭头函数的应用场景

```
var obj = {
data:[],
getData:function(){
var _this = this
setTimeout(function(){
var result = ["abc","cba"];
this.data = result;//这种操作this会指向window那么应该如何把this指向obj呢
//箭头函数出来之前
_this.data = result
},2000)
}
}
obj.getData

setTimeout(()=>{
var result = ["abc","cba"];
this.data = result;//箭头函数没有this那么this就会从上层找
},2000)
```

### call、apply、bind

```

```

### compose、柯里化

```

```

### js语法补充（with eval strict模式）

```
var obj = {name:"xxx",age:15,like:"football"}

function testWith(){
	with(obj){
       console.log(`i am ${name}+now my age is${age}+i like ${like}`)
             }
}
testWith()
目前不建议用with语句，严格模式下报错
```

```
eval函数的使用
var jsstring = 'var message ="hello world";console.log(message)'
eval(jsstring)
不建议开发下使用：阅读性性差、eval传入字符串，字符串可以被修改，容易被攻击、eval执行js引擎不会帮忙做优化
```

```
"use strict";//js开启严格模式
通过抛出错误来代替非严格模式下的静默错误（例如true.name="xx"）
可以让js引擎执行代码进行更多优化（不需要对一些特殊语法进行处理）
禁用了在ECMAScript未来版本中可能会定义的一些语法
严格模式下，自执行函数 this会执行undefined 没有默认执行window了
```

### 面向对象

```
//需求：不允许某些属性被复制、删除、遍历时被遍历出来
var obj = new Object()
Object.defineProperty(obj,"name",{
value:"wangming",
configurable:false,//这样定义默认为false，键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
enumerable:fale,//不可枚举，这样定义默认为false
writable：false,//是否可修改，这样定义默认为false
})
//描述符分为：数据属性和存取属性


Object.seal() 相当于 把configurable描述符设置为false
Object.freeze()相当于 把writable描述符设置为false
```

|          | configurable | enumerable | value | writable | get  | set  |
| -------- | ------------ | ---------- | ----- | -------- | ---- | ---- |
| 数据属性 | √            | √          | √     | √        | ×    | ×    |
| 存取属性 | √            | √          | ×     | ×        | √    | √    |

### 创建对象方案-工厂模式

```
function CreatePerson(name,age,height){
  var p = {}
  p.name = name;
  p.age = age;
  p.height = height;
  p.running = function(){
  console.log(this.name+"is running")
  }
  return p
}
var p1 =  CreatePerson("zhangsan",18,1.88)
var p2 =  CreatePerson("lisi",20,0.88)
var p3 =  CreatePerson("wangwu",38,2.88)

//缺点：p1 p2 p3不能知道自己的构造函数是谁，获取不到对象真实的类型。
```

### 创建对象方案-构造函数 

```
function CreatePerson(name,age,height){
  this.name = name;
  this.age = age;
  this.height = height;
  this.running = function(){
  console.log(this.name+"is running")
  }
}
var p1 = new CreatePerson("zhangsan",18,1.88)
var p2 = new CreatePerson("lisi",20,0.88)
var p3 = new CreatePerson("wangwu",38,2.88)

//缺点：p1.running!==p2.running,每次创建对象都会创建新的running函数，浪费空间
```



### new操作符内部所做的事情

```
1.在内存中创建一个新的对象
2.这个对象内部的[[prototype]]会指向构造函数的prototype
3.构造函数内部的this，会指向创建出来的新对象
4.执行函数的内部代码
5.如果构造函数没有返回非空对象，则返回创建出来的新对象
```

### 原型（隐式原型）

```
每个对象都有一个特殊的内置对象[[prototype]]，原型（隐式原型）
var obj = {}
console.log(obj.__proto__)//__proto__指向他的原型，通过它访问的对象的内部[[Prototype]]，是由浏览器提供的，不是ecmascript语言规范，为了兼容性应该使用这个 Object.getPrototypeOf/Reflect.getPrototypeOf 


```

### 原型（显式原型）

```
function foo(){

}
console.log(foo.__proto__)//函数作为对象 ，有隐式原型
console.log(foo.prototype)//函数作为函数，有一个显示原型属性 prototype，作用当通过 new调用时（2.这个对象内部的[[prototype]]会指向构造函数的prototype）prototype中有个constructor属性，指向构造函数本身
```

### 创建对象方案-构造函数 和 原型

```
function CreatePerson(name,age,height){
  this.name = name;
  this.age = age;
  this.height = height;
  //CreatePerson.prototype.name;//这样的话就会每个对象创建就会覆盖所也不能这样做，所以只需要把函数拿出来就行
}
CreatePerson.prototype.running = function(){
  console.log(this.name+"is running")
  }
var p1 = new CreatePerson("zhangsan",18,1.88)
var p2 = new CreatePerson("lisi",20,0.88)
var p3 = new CreatePerson("wangwu",38,2.88)
```

### Object的原型链

```
var obj = {name:"xxx"}  // var obj2 = new Object()
console.log(obj.__proto__)//顶层的原型就是Object的原型对象   Object.prototype === obj.__proto__
console.log(obj.__proto__.__proto__)//null,顶层原型的原型为null
```

### 面向对象-继承的实现（原型链方式X.prototype.\__proto\__ == Y.prototype  ）

```
function Person(name,age){
this.name = name;
this.age = age;
this.friends = []
}
Person.prototype.running = function(){
  console.log(this.name +"is running")
}
function Student(sno){
  this.sno = sno
}
//为什么不 Student.prototype = Person.prototype
//因为 Student.prototype.ssss = function(){},那么 Person.prototype也有这个方法了，错误
Student.prototype = new Person()//这样Student的prototype就指向了Person的对象，Person对象又可以通过__proto__指向 Person的原型上的方法
Student.prototype.study = function(){
  console.log(this.name+"is study")
}
var student1 = new Student()

弊端1.打印student对象时，无法打印出 name age 这些父类上的属性
弊端2.父类中的引用类型，通过student1.friends.push("xxx"),这样两个对象之间会相互影响，student1.name="xxxx",这种会直接添加在对象上，不会修改原型上的数据
弊端3.无法new Student("参数"),这个参数目前无法传到父类，接下来
```

### 面向对象-继承的实现（借用构造函数继承）

```
function Person(name,age){
this.name = name;
this.age = age;
this.friends = []
}
Person.prototype.running = function(){
  console.log(this.name +"is running")
}
function Student(name,age,sno){
  ------Person.call(this,name,age),//此处的this为创建student对象时绑定的student对象，参考new 过程，就加了这一步
  this.sno = sno
}
Student.prototype = new Person()//这样Student的prototype就指向了Person的对象，Person对象又可以通过__proto__指向 Person的原型上的方法
Student.prototype.study = function(){
  console.log(this.name+"is study")
}
var student1 = new Student()

弊端:1.Person 函数至少会被调用两次。
     2.Student.prototype = new Person();会给原型上添加 name:undefined，age:undefined，多出没必要的属性
     
```

##### 原型式继承(根据对象原型创建对象 ，之前都是通过函数创建对象)

```
//根据对象创建 以该对象为原型的对象,原型式继承
function createObject(o){
var newObj = {};
Object.setPrototypeOf(newObj,o)
return newObj
}
//道格斯 的做法，因为当时没有 setPrototypeOf
function createObject(o){
function Fn(){}
Fn.prototype = o;
return new Fn()
}
//最新的ecma 实现如下
var info = Object.create(obj)
```

### 面向对象-继承的实现（寄生式继承-对象其实就是（工厂函数+对象的原型式继承））

```
var Pobj = {
name:"xxx",
age:18,
running:function(){
console.log("running")
}
}
function createStudent(person,sno){
var stu = Object.create(person)
stu.sno =sno
stu.studying = function(){
console.log("studying")
}
}
var student1  = createStudent(Pobj,sno)


```

### 面向对象-继承的实现(寄生组合式继承)

```
function Person(name,age){
this.name = name;
this.age = age;
this.friends = []
}
Person.prototype.running = function(){
  console.log(this.name +"is running")
}
function Student(name,age,sno){
  ------Person.call(this,name,age),//此处的this为创建student对象时绑定的student对象，参考new 过程，就加了这一步
  this.sno = sno
}
//属性已经继承了接下来继承行为也就是函数
Student.prototype  = Object.create(Person.prototype)//但是仅仅这样创建出的对象的constuctor的指向会有问题，所以下一步
Student.prototype.constuctor = Student//
Object.defineProperty(Student.prototype,"constructor",{
configurable:true,
enumerable:fale,
writable:true,
value:Student
})//这种赋值更具有可控性
Student.prototype.study = function(){
  console.log(this.name+"is study")
}
var student1 = new Student()
```

### 继承的通用实现

```
function inheritPrototype(subType,superType){
subType.prototype  = Object.create(superType.prototype)
Object.defineProperty(subType.prototype,"constructor",{
configurable:true,
enumerable:fale,
writable:true,
value:subType
}
}
```

### 关于object的一些判断操作

```
let obj = {name:"xxx"};let o = Object.create(obj);Object.defineProperty(o,"address",{enumerable:false});Object.defineProperty(o,"addresss",{enumerable:true})

for(let key in o){console.log(key)};可以打印出在原型上的属性  name以及可枚举属性
console.log("address" in o) //可判断原型上以及该对象上的所有属性（包括不可枚举）
Object.keys(o)//不可遍历到不可枚举，也不可以遍历到原型上的属性.
o.hasOwnProperty("name") //false 只判断当前对象，不在原型链上向上查找
// subType instanceof superType 判断subType的原型链上是否出现了 superType
// instanceof 用于检测构造函数的prototype，是否出现在某个实例对象的原型链上
isPrototypeOf // 用于检测某个对象，是否出现在某个实例对象的原型链上
obj.isPrototypeOf(o)
```

### 关于Object和Function(对象有[[prototype]]也就是隐式原型,函数多一个prototype显示原型)

```
Function.prototype.__proto__ == Object.prototype  
//true  Function的prototype是对象，是由Object构造出来的对象
Object.prototype.__proto__ == null  
Object.__proto__ == Function.prototype  
//true  Object是由Function构造出来的函数对象，所以Object.__proto__ == Function.prototype 

Function.__proto__ ==Function.prototype 
// true Function是函数也是对象，作为对象，他是由Function构造出来的所以 Function.__proto__ ==Function.prototype 
```

# ES6

### 解构

```，让这些操作就
数组解构
var name = ["abc","cba","bca"]
var [item1,item2,item3] = name;
var [item1,item2,item3,item4 = "aaaa"] = name;
var [,,item3] = name
var [item1,...newNames] = name// 这里和剩余参数的用法很相似


对象的解构
var obj = {name:"wm",age:11}
var {name,age} = obj  //根据key相应的解构
var {name:newName} = obj  //结构出来重命名
var {address:newAddress = "tys"}

关于ES6的暂时性死区举例：
var foo = "foo";
if(true){
console.log(foo)
let foo  = "abc"
}

标签模板字符串的使用
function foo(m,n){
 console.log(m,n) //[hello,wo,rld] name
}
foo`hello${name}wo${}rld`

关于函数的长度属性foo.length 的值是从有默认值形参位置截断例如 foo(a,b=1,c)长度为1

展开运算符：
可以在函数调用或者数组构造时，将数组或者string在语法层面上展开foo(...names);foo(...str); const newNames = [...names]
构造字面量对象时，将对象按照key-value展开（ES9特性）// const newObj = {...obj,address:"tys"}

Reflect 它是一个对象(反射)
Reflect.getProtoypeOf()
Reflect.defineProperty(target,propertyKey,attributes)
为什么出现，因为Object作为构造函数，这些操作不应该放到它身上
所以新增Reflect
let obj = {
_name:"xx"
get name(){
return this._name
}
}
//响应式实现里面  return Reflect.get(target,key,receiver)
//receiver改变obj中this指向，这样 _name的访问和name的访问都可以被拦截到

function Student(name,age){
this.name = name;
this.age = age;
}
function Teacher(){

}
const teacher = Reflect.construct(Student,["xx",11],Teacher)
console.log(teacher.__proto__ == Teacher.prototype)
```

### Symbol数据类型

```

let a = Symbol('');
let b = Symbol('');
console.log(a===b)//false ，在属性内部添加一个属性时，不确定某个对象中是否有某个属性时，可以通过symbol包裹后添加，避免冲突
//例如apply bind cll实现时，添加了一个fn函数
ES10中可以传入一个描述，也可以获取到如下
let a = Symbol('title');a.description//title

通过Object.keys和Object.getOwnPropertyNames获取不到为symbol的key  ，需要用Object.getOwnPropertySymbols


let a = Symbol.for("aaa")，查找没有才会创建
let b = Symbol.for("aaa")，
console.log(a===b)//true
Symbol.keyFor(a)  //传入symbol
```

### Set(WeakSet)数据类型

```
类似于数组，但是不能重复
const set = new Set()
set.add(5)
set.add({})
set.size
set.delete(5)
set.has(100)//false
set.clear()
set.forEach((item)=>{})
for(const item of set){
console.log(item)
}
对数组去重
arr = [1,2,1]
const set = new Set(arr) //传入可迭代对象	
const newArr = Array.from(set) //const newArr = [...set]



WeakSet,//只能存放对象类型，不能存放基本类型，对存放到里面的数据为弱引用，就是
let obj = {name:"why"}，//一般的强引用  obj:ox100,就算没有使用obj 那么此对象也不会被回收，因为obj指向它  
//弱引用 就是即使有这个引用也会被gc回收，除非有强引用
weakSet 不能遍历，不能拿值
应用场景
const personSet = new WeakSet()
class Person()
constructor(){
personSet.add(this)
}
running(){
if(!personSet.has(this)){
throw new Error("不能通过非此构造函数方法创建出来的对象调用runing")
}
console.log(running)
}
}
const p = new Person()
p.running()
p.running.call({name:"xxx"})
```

### Map(WeakMap)数据类型   16 1.14.29

```
对象 string/symbol类型做key
map string/symbol/object等类型做key，map允许我们用对象类型作为key
let map = new Map([[key,value],[key,value],[key,value]]) //参数可以直接放entries数据类型
map.set(obj,"xxx")
map.size
map.get(obj)
map.has(obj)
map.delete(obj)
map.clear()
map.forEach((item,key)=>{})
for(const item of map){
console.log(item[0],item[1])
}


WeakMap
key只能是对象，对象作为key时，是弱引用
```

### 箭头函数

```
箭头函数没有prototype属性，不能new调用
this,arguments都是从上层作用域获取.
```

### 浅拷贝

```
展开运算符
```

### 关于进制数值

```js 
0O //八进制  octonary
0b //二进制  binary
0x //十六进制 hex
ES12 大数值连接符 10_000_000_000方便阅读 
```

# ES7

```
Array-includes()方法
names.inculdes("nnn",2)//第二个参数表示从第几个开始找
相比于indexof ，inculdes可以判断NAN


指数的运算
之前 Math.pow(3,3)3^3
es7 3**3
```

### ES8

```
Object.values()
Object.keys()
Object.entries()
String Padding（填充）
message.padStart(15,"*").padEnd(20,"-")//15表示填充完的字符串长度

async await
```

ES10

```
flat flatMap
let nums = [[[[1,2,3]]]];
let newnums = nums.flat(2)//默认只降一维
nums.flatMap((item)=>{
return item * 2
},)
const messages = ["hello world"]
const words = messages.flatMap(item=>{
return item.split(" ")
})
console.log(words)

entries转obj
Object.fromEntries(entries)
//应用场景
queryString  = 'name="Xxx"&age=18'
const query =  new URLSearchParams(queryString)
Object.fromEntries(query)


trimStart trimEnd
```

### ES11

```
bigint  数字后+n   10n + 10n
BigInt(num)//num转为大数类型
Number(bigint)//bigint转为 一般数字
为什么需大数字 因为 Number.MAX_SAFE_INTEGER + 2 会出现计算错误

Nullish-coalescing-operator 空值合并运算
let foo 
let oo = foo || "默认值"
//逻辑或的弊端 如果foo=""或者foo = 0;就需要额外处理
所以 出现了这个  foo ?? "默认值"

可选链 Optional chaning
	const info = {firend:{girlFriend:"xx"}}
	console.log(info?.firend?.girlFriend)
	?.表示有才取

获取全局对象globalThis   node或者浏览器环境下 都指向全局



ES Module 
Promis.allSettled
import meta
```

### ES12

```
FinalzationRegister
let obj = {name:"xxx"}
const registry = new FinalizationRegistry((value)=>{
console.log("销毁掉了",value)
})
registry.register(obj, "some value")
//registry.unregister(obj);
obj = null //销毁前监听销毁

let info  = WeakRef(obj)//创建弱引用
console.log(info.deref()) 

let n = 1
n = n+1 n+=1;

ES12对逻辑或 逻辑与  逻辑空
||=  &&=   ??=

String.replaceAll 

```

### 关于ES Module

```
script标签上添加type = module
1.export + 声明语句
export const name = "xxx"
export function foo(){
}
2.export + {}
const name = "xxx"
function foo(){}
export{
name as fname,
foo
}// {}不是对象是export的固定语法
3.默认导出
// 1.默认导出的方式一:
export {
  // age as default,
}

// 2.默认导出的方式二: export default foo

导入  import {name as fname,foo} from ".js"
      import * as foo from ".js"
    
      import why from '.js'//导入的默认的导出
      
import 函数import(".js").then(res=>{})      
import 作为对象，有meta 属性  console.log(import.meta)
```

```
改变原数组：pop(删除最后一个)、push(追加一个或多个)、unshift() 、reverse()、shift(删除第一个元素)、sort()、splice()
不会更改现有数组，而是返回一个新数组：concat,filter,map,slice()
前闭后开 [0,3) 包含零不包含三  .fill('1',0,3)   .slice
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
,every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值,若收到一个空数组，此方法在一切情况下都会返回 true。
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
flat() 数组扁平化
jion()数组变为字符串
String.split()，字符串转变为数组
```

