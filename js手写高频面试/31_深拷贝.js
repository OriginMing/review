function isObject(obj){
   return typeof obj == 'object' && obj != null
}
function deepClone(obj,hash=new WeakMap()){
    if(!isObject(obj)) return obj;
    if(hash.has(obj)){
        return hash.get(obj)
    }
    let target = Array.isArray(obj)?[]:{};
    hash.set(obj,target);
    Reflect.ownKeys(obj).forEach((item)=>{
        if(isObject(obj[item])){
            target[item] =deepClone(obj[item],v)
        }else{
            target[item] = obj[item]
        }
    })
    return target
}

let a = [1,2,3]
console.log(deepClone(a)); 