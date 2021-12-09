

class Dep{
    constructor(){
        this.subscribers = new Set()
    }
    depend(){
       if(activeEffect){
        this.subscribers.add(activeEffect)
       }
    }
     notify(){
        this.subscribers.forEach(item=>{
            item()
        })
    }

}
let activeEffect = null;
function watchEffect(effect){
    activeEffect = effect
    effect()
    activeEffect = null;
}
let targetMap = new WeakMap();
function getDep(target,key){
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep()
        depsMap.set(key,dep)
    }
    return dep
}
function reactive(Obj){
    Object.keys(Obj).map(key=>{
        let dep =getDep(Obj,key)
        let value = Obj[key]
        Object.defineProperty(Obj,key,{
            get(){
              dep.depend()
              return value
            },
            set(newValue){
              if(value!=newValue){
                  value = newValue
                  dep.notify()
              }
            }
        })
    })
   return Obj
}
// 测试代码
const info = reactive({counter: 100, name: "why"});
const foo = reactive({height: 1.88});
let arr  = [0,2,3]
// watchEffect1
watchEffect(function () {
  console.log("effect1:",info.counter);
})
watchEffect(function () {
    console.log("effect2:",arr[0]);
  })