/* call 和apply不同的地方是 apply第二个参数为数组， */
Function.prototype.myCall = function (context, ...args) {
    if (!context || context === null) {
      context = window;
    }
    // 创造唯一的key值  作为我们构造的context内部方法名
    let fn = Symbol();
    context[fn] = this; //this指向调用call的函数
    // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
    return context[fn](...args);
  };

 Function.prototype.myApply = function (context,args){
    if (!context || context === null) {
        context = window;
      }
      let fn = Symbol();
      context[fn] = this;
      return context[fn](...args)
 }
 Function.prototype.myBind = function(context,...rest){
    if(!context){
      context = window
    }
    return (...rest2)=>{
      this.apply(context,[...rest,...rest2])
    }
 }
 var foo = {
   value :1
 }
 var bar = function(name,age){
   console.log(name,age);
   console.log(this);
 }
 var result = bar.myBind(foo,'anny')
 result(22)
  


  function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  
  function Food(name, price) {
    Product.myCall(this, name, price);
    this.category = 'food';
  }
  
  console.log(new Food('cheese', 5).name);
