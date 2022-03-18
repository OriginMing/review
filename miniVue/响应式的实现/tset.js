class Dep{
    /* 收集于释放依赖 */
    constructor(){
        this.describe   = new Set()
    }
    depend(){
        /* 收集依赖 */
        if(activeEffect){
            this.describe.add(activeEffect)
        }
    }
    notify(){
        /* 通知改变 */
        this.describe.forEach(item=>{
            item()
        })
    }
}
let targetMap = new WeakMap();
function getDep(target,key){
    let depMap = targetMap.get(target)
    if(!depMap){
        depMap = new Map()
        targetMap.set(target,depMap) 
    };
    let dep  = depMap.get(key)
    if(!dep){
        dep = new Dep()
        depMap.set(key,dep)
    }
    return dep
}
/* function reactive(raw){
   Object.keys(raw).map(key=>{
       let value = raw[key]
       let dep = getDep(raw,key)
       Object.defineProperty(raw,key,{
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
   return raw
} */
function reactive(raw){
    return new Proxy(raw,{
        get(target,key){
           let dep = getDep(target,key)
           dep.depend()
           return target[key]
         },
        set(target,key,newValue){
            const dep = getDep(target, key);
            target[key] = newValue;
            dep.notify();
        }
    })
}
let activeEffect = null
function watchEffect(effect){
    activeEffect = effect
 effect();
 activeEffect = null
}
const info = reactive({counter:1})
watchEffect(function(){
    console.log(info.counter); //2次
})
watchEffect(function(){
info.counter = 2
})