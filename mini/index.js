class Dep{
    constructor(){
      this.subscribe = new Set()
    }
    depend(){
     if(activeEffect){
         this.subscribe.add(activeEffect)
     }
    }
    notify(){
     this.subscribe.forEach(item=>{
         item()
     })
    }
}

let activeEffect = null;
function watchEffect(fn){
    activeEffect = fn;
  fn(),//执行的过程中收集依赖
  activeEffect = null;
}

// 创建
let targetMap = new WeakMap();
function getDep(target,key){
  let  depsMap  = targetMap.get(target);
 if(!depsMap){
     depsMap = new Map()
     targetMap.set(target,depsMap)
 }
 let dep = depsMap.get(key);
 if(!dep){
     dep = new Dep()
     depsMap.set(key,dep)
 }
 return dep
}

// function reactive(obj){
//    return new Proxy(obj,{
//         get(target,key){
//             let dep=  getDep(target,key);
//             dep.depend()
//             return target[key]
//         },
//         set(target,key,newValue){
//             let dep=  getDep(target,key);
//             target[key]  = newValue;
//             dep.notify()
//         }
//     })
// }

function reactive(obj){
    Object.keys(obj).map(key=>{
        let value = obj[key];
        let dep = getDep(obj,key)
        Object.defineProperty(obj,key,{
            get(){
                dep.depend()
                return value  
            },
            set(newValue){
                if(newValue!=value ){
                    value = newValue
                    dep.notify()
                }
            }
        })
    })
   return obj
}

let obj =reactive({a:1})
watchEffect(function test(){
    console.log(obj.a)
})
watchEffect(function test(){
    console.log("函数二",obj.a)
})
obj.a = 2



