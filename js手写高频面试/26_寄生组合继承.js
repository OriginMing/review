/* function Parent(name){
  this.name = name;
  this.say=()=>{
      console.log(name+"say haha")
  }
}
Parent.prototype.play = ()=>{
    console.log("I PLAY");
}
function Children(name){
    console.log(11);
    Parent.call(this,name);
    this.name = name;
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;
 let child = new Children("wangming");
 child.say() */

 /* 组合式继承 */
 function Supertype(name){
    this.name = name;
    this.color = ['red', 'blue', 'green']
 }
 //创建一个方法
 Supertype.prototype.sayname = function(){
     console.log(this.name);
 }
 function Subtype(name,age){
    Supertype.call(this, name); 
    this.age = age;
 }
    Subtype.prototype = new Supertype() //经过这一步 子类就可以通过原型链访问父类的方法和属性
    //Subtype.prototype = Supertype.prototype  //不这样做是因为，这样无法单独给子类添加方法
   // console.log(Subtype.prototype.constructor);
    Subtype.prototype.constructor = Subtype;
    // 经过上一步 子类的construct指向了父类，应该构造函数只想本身
    Subtype.prototype.myMoney = function() {
        console.log('我想要有钱')
      }
      var st = new Subtype('zz',20)
      st.sayname()
      console.log(st.constructor)
      console.log(st.age);


      /* 寄生继承 */
      function create(obj){
        let mango = Object.create(obj);
        mango.desc = function(){
            console.log('desc');
        };
        return mango;
    }
    let fruit = {
        name:'水果',
        nutrition:['维生素']
    };
    
    let mango1 = create(fruit);
    let mango2 = create(fruit);
    
    mango1.nutrition.push('膳食纤维');
    mango2.nutrition.push('柠檬酸');
    console.log(mango1.nutrition); // ["维生素", "膳食纤维", "柠檬酸"]
    console.log(mango2.nutrition); // ["维生素", "膳食纤维", "柠檬酸"]
    // 增强的属性是子类的实例的独有属性
    console.log(mango1.desc === mango2.desc); // false;
    mango1.desc(); // "desc"
    mango2.desc(); // "desc"