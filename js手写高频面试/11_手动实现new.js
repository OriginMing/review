function Person(name,age){
    this.name=name
    this.age=age
   }
   Person.prototype.sayHi=function(){
    console.log('Hi！我是'+this.name)
   }
   let p1=new Person('张三',18)
   p1.sayHi()

   
function _new(ConsFun){
    return function(...rest){
        let obj = {}  //新生成了一个对象
        obj.__proto__ = ConsFun.prototype  //新对象隐式原型链接到函数原型
        ConsFun.apply(obj,rest) //调用函数绑定this，为实例添加方法和属性
        return obj
    }
}   
let p2=_new(Person)('李四',19)
p2.sayHi()