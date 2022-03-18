/* 继承要干的事情
把父类的属性和方法想办法绑定到子类上
把父类添加到子类的原型链上
*/

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



/*原型链继承 
 */
/* function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.name) */
//这种方式属性其实并不是子对象自己持有的，所有子类实例共享父类的属性，此种方法可以访问父类原型上的方法（构造函数不可以）

/*  end*/
/*  构造函数继承*/

/* function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); */ // ["kevin", "daisy"]
//此种方法不可以访问父类原型上的方法
/* end */


 /* 组合式继承   
 
 将原型链和借用构造函数的技术组合到一块，发挥二者之长的一种继承模式。*/
 function Supertype(name){
    this.name = name;
    this.color = ['red', 'blue', 'green']
 }
 //创建一个方法
 Supertype.prototype.sayname = function(){
     console.log(this.name);
 }
 function Subtype(name,age){
    Supertype.call(this, name);  //经过此 父类的方法体的属性就可以被子类继承到了，接下来把父类添加到子类的原型链上
    this.age = age;
 }
  //Subtype.prototype = new Supertype() //经过这一步 子类就可以通过原型链访问父类的方法和属性，父类就添加到子类的原型链上了
   Subtype.prototype = Object.create(Supertype.prototype); //上一步改为这个就为计生组合式继承
    //Subtype.prototype = Supertype.prototype  //不这样做是因为，这样无法单独给子类添加方法
   // console.log(Subtype.prototype.constructor);
    Subtype.prototype.constructor = Subtype;
    // 经过上一步 子类实例的construct指向了父类，应该指向子类本身，所以要将子类实例的指向改对
    Subtype.prototype.myMoney = function() {
        console.log('我想要有x')
      }
      var st = new Subtype('zz',20)
      st.sayname()
      console.log(Subtype.prototype.__proto__);

      /* 寄生继承 */
    /*   function create(obj){
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
    mango2.desc(); // "desc" */


    