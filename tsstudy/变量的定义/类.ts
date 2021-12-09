class Person {
    name: string = ""
    age: number = 0
  
    eating() {
      console.log("eating")
    }
  }
  
  class Student extends Person {
    sno: number = 0
    constructor(){
        super();
     
    }
    studying() {
      console.log("studying")
    }
  }
  let student  = new Student()

  interface IPerson{
      name:string,
      eating:()=>void
  }
  const obj= {
      name:"xxx",
      age:18,
      eating:function(){}
  }
  const p:IPerson = {name:"xxx",eating(){}};
  const p2:IPerson = obj; //变量标识符 赋值给其他的变量时，会进行freshness擦除操作
  console.log(p2);

  const flag2 = "" ?? true
console.log(flag2)

 declare module "loadsh" {
     export function join(args:any[]):any
 }