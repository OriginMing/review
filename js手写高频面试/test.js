// function Foo() {
//     getName = function () {
//       console.log(1);
//     };
//     return this;
//   }
//   Foo.getName = function () {
//     console.log(2);
//   };
//   Foo.prototype.getName = function () {
//     console.log(3);
//   };
//   var getName = function () {
//     console.log(4);
//   };
//   function getName() {
//     console.log(5);
//   }
//   Foo.getName();//2
//   getName();//4
//   Foo().getName()//1
//   getName();//1
//   new Foo.getName();//2
//   new Foo().getName();//3
//   new new Foo().getName();//3


  function isObj(obj){
     return (typeof obj == 'object'&&obj!=null)
  }
  function deepClone(obj,hash =new WeakMap()){
      if(!isObj(obj))return obj
      if(hash.has(obj)){
          return hash.get(obj)
      }
         let result = Array.isArray(obj)?[]:{}
        hash.set(obj,result)
        Reflect.ownKeys(obj).forEach(key=>{
            if(isObj(obj[key])){
                result[key]= deepClone(obj[key],hash)
            }else{
                result[key]=obj[key]
            }
        })
      return result
    
  }
  function Mynew(fn,...rest){
    let obj = Object.create(fn.prototype)
     let res =  fn.call(obj,...rest);
    return (res&&(typeof res =='object'|| typeof res=='function'))?res:obj
  }
  function Myinstanceof(left,right){
        while(true){
            if(left==null){
                return false
            }else if(left.__proto__==right.prototype){
               return true
        }
        left = left.__proto__
  }
}
// 实现和asyn await样的效果
function getDate(result){
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{resolve("111"+result)},1000)
    })
}
function *test(){
    let result = yield getDate("")
    console.log(result);
    let result2 = yield getDate(result)
    console.log(result2);
}
function exe(genFn){
    let genO =  genFn();
    function e(up){
        let res = genO.next(up)
        if(res.done){
            console.log(res);
        }else{
            res.value.then(res=>{
                e(res)
            })
        }
    }
    e()
}
// 数组扁平化
// function Myflaten(arr,deep){
//     let result = []
//     arr.forEach(item=>{
//         if(Array.isArray(item)&&deep>0){
//                 result = result.concat(Myflaten(item,deep-1))
//         }else{
//             result.push(item)
//         }
//     })
//     return result
// }
// function Myflaten(arr,deep){
//     while(arr.some((item)=>Array.isArray(item)&&deep)){
//       arr = [].concat(...arr)
//       deep--
//     }
//     return arr
// }

function Myflaten(arr,deep){
    if(!arr.length)return
   let res =   arr.reduce((pre,curent)=>{
      return   Array.isArray(curent)&&deep?[...pre,...Myflaten(curent,deep-1)]:[...pre,curent]
     },[])
     return res

}
 arr1 = [1, 2,[3,1],[2,3,4,[2,3,4]]]
let res =  Myflaten(arr1,2)
console.log(res);



class Dep{
    constructor(){
        this.subscribe = new Set()
    }
    depend(){
        if(watchEffectFn){
            this.subscribe.add(watchEffectFn)
        }
    }
    notify(){
        this.subscribe.forEach(fn=>{
            fn()
        })
    }
    
}
let watchEffectFn = null
function watchEffect(fn){
 watchEffectFn = fn
 fn()
 watchEffectFn =null
}
let objDep = new WeakMap()
function getDep(obj,key){
    let objMapDep= objDep.get(obj)
    if(!objMapDep){
        objMapDep = new Map()
        objDep.set(obj,objMapDep)
    }
     let keyMapDep =  objMapDep.get(key)
     if(!keyMapDep){
        keyMapDep = new Dep()
        objMapDep.set(key,keyMapDep)
     }
     return keyMapDep
}
// function reactive(obj){
//     return new Proxy(obj,{
//         get(target,key){
//             let keyDep =  getDep(obj,key)
//             keyDep.depend()
//             return target[key]
//         },
//         set(target,key,newValue){
//             let keyDep =  getDep(obj,key)
//             target[key] =newValue
//             keyDep.notify()
//         }
//     })

// }


function reactive(obj){
    Object.keys(obj).forEach(key=>{
        let value = obj[key]
        let dep = getDep(obj,key)
       Object.defineProperty(obj,key,{
           get(){
            dep.depend()
             return value
           },
           set(newValue){
             value = newValue
             dep.notify()
           }
       })
    })
    return obj
}

const info = reactive({counter: 100, name: "why"});
const foo = reactive({height: 1.88});
  watchEffect(function(){
    console.log(info.counter); //2次
})
info.counter = 2
