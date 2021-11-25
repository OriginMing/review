/* 浅拷贝方式一 */
function shallowCopy(target,origin){
  for(let index in origin ){
      target[index] = origin[index]
  }
  return target
}
/* 浅拷贝方式二 */
Object.assign() //只适用于对象
Array.prototype.slice(0) || Array.prototype.concat(); //

/* 深拷贝的实现方式一*/
const a = JSON.parse(JSON.stringify())
/* 方式二 递归调用 */
function deepCopy(target,origin){
    for(let index in origin ){
        let item = origin[index]
       if(item instanceof Array){
          target[index] = []
          deepCopy(target[index],item)
       }else if(item instanceof Object){
        target[index] = {}
        deepCopy(target[index],item)
       }else{
        target[index] = item
       }
    }
    return target
  }

