- 环境的安装
安装全局的TS
npm i typescript -g
tsc --version
### 运行Ts的方式：
 - 编译ts文件 将Ts通过 tsc <文件名称> 编译为js运行
 - 全局安装ts-node tslib @types/node  可以用node环境直接运行Ts 不用先转为js
### 需要注意的知识点
 - unknown 和any的区别  unknown会保证类型安全
 - never 例如抛出异常函数，或者死循环
 never的应用场景如下 
 ```
  function foo(): never {
         // 死循环
   while(true) {

   }
 }

 function bar(): never {
   throw new Error()
 }
 function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log("string处理方式处理message")
      break
    case 'number':
      console.log("number处理方式处理message")
      break
    case 'boolean':
      console.log("boolean处理方式处理message")
      break
    default:
      const check: never = message
  }
}
 ```
 - 元组类型
 在ts里数组存在弊端，数组想每一项无法放入不同类型数据元组可以很好的弥补这个问题,
 let arr:(string|number|null)[]
 ```
 const info: [string, number, number] = ["nihao", 18, 1.88];
 应用场景：例如React的useState
const tuple: [any, (newState: any) => void] = [currentState, changeState]
 ```
 - 可选参数只能放在末尾
 ```
 function add(x:number,y?:number):void{}
 ```
-  TS 中函数不能随便赋值，会报错的，解释：定义了一个函数，这个变量以后只能被赋值为函数
 - 定义索引类型（type和interface都可以）
 ```
 interface IndexLanguage {
  [index: number]: string
}

 ```
 - 关于TS里的类
 TS 通过 public、private、protected 三个修饰符来增强了 JS 中的类。
 抽象方法和多态:多态指的是，父类定义一个抽象方法，在多个子类中有不同的实现
 类可以实现多个接口
   ```
   约束类上的构造方法
   interface CircleStatic {
     new (radius: number): void
    pi: number
    }
   ```
 - 关于枚举
   特点：数字递增、反向映射
   ```
   const enum Direction {
    Up,
    Down,
    Left,
    Right
    }
   console.log(Direction.Up)        // 0
   console.log(Direction.Down)      // 1
   console.log(Direction.Left)      // 2
   console.log(Direction.Right)   // 4
   console.log(Direction[0])      // Up
   console.log(Direction[1])      // Down
   console.log(Direction[2])      // Left
   console.log(Direction[3])      // Right
   ```
   枚举的意义在于，可以定义一些带名字的常量集合，清晰地表达意图和语义，更容易地理解代码和调试。

- 联合类型（|）交叉类型（&）
- interface和type
  type 是类型别名，用于给各种类型定义别名，让 TS 写起来更简洁、清晰。
 interface（接口） 是 TS 设计出来用于定义对象类型的，可以 对对象的形状进行描述。
  interface可以合并重复声明，type 不行
  type 可以声明基本类型、联合类型、交叉类型、元组，interface不行
  平时开发中，一般使用组合或者交叉类型的时候，用 type。
  一般要用类的 extends 或 implements 时，用 interface。
 用Type和interface定义泛型
 ```
 type Print = <T>(arg: T) => T
 interface Iprint<T=number> {
    (arg: T): T
}
 ```

 副作用函数
 ```
 interface UserInfo {
    name: string
    age: number
}

function request<T>(url:string): Promise<T> {
    return fetch(url).then(res => res.json())
}

request<UserInfo>('user/info').then(res =>{
    console.log(res)
})    
 ```
 关于泛型约束
 ```
 function printLength<T>(arg: T): T {
    console.log(arg.length)
    return arg
}
因为不确定 T 是否有 length 属性，会报错：
可以使用泛型约束
interface ILength {
    length: number
}

function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}
```
- keyof常与typeof结合使用
keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
```
interface IPerson {
  name: string;
  age: number;
}

type Test = keyof IPerson; 
```
