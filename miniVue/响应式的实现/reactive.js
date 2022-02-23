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
let targetMap = new WeakMap()//key 必须为对象，并且对对象为弱引用  targetMap =  {{key:Dep}:Map}
/*   {
    target:{xx:dep}
  } 
   */
  /*   {
    target:{target.key:dep}
  } 
   */
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

function reactive(raw){
    Object.keys(raw).map(key=>{
        let dep = getDep(raw,key)
        let value = raw[key]
        Object.defineProperty(raw,key,{
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
    return raw
}
// function reactive(raw) {
//     return new Proxy(raw, {
//       get(target, key) {
//         const dep = getDep(target, key);
//         dep.depend();
//         return target[key];
//       },
//       set(target, key, newValue) {
//         const dep = getDep(target, key);
//         target[key] = newValue;
//         dep.notify();
//       }
//     })
//   }
let activeEffect = null;
function watchEffect(effect){
    activeEffect=effect;
    effect();
    activeEffect = null;
}

// 测试代码
const info = reactive({counter: 100, name: "why"});
const foo = reactive({height: 1.88});
let arr  = [0,2,3]
// watchEffect1
/* watchEffect(function () {
  console.log("effect1:",info.counter);
})
watchEffect(function () {
    console.log("effect2:",arr[0]);
  })
 */
  watchEffect(function(){
    console.log(info.counter); //2次
})

info.counter = 2

