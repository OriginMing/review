function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype);
    console.log(obj)
    //let res = fn.call(obj, ...args);
    fn.call(obj, ...args)
   /*  if (res && (typeof res === "object" || typeof res === "function")) {
      return res;
    } */
    /* 注释里的东西没明白想干嘛 */
    return obj;
  }
   function Person(name, age) {
     console.log(this);
   this.name = name;
   this.age = age;
 }
 Person.prototype.say = function() {
   console.log(this.age);
 };
 let p1 = myNew(Person, "lihua", 18);
 console.log(p1.name);
p1.say();

  
