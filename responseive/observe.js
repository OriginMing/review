const data = {
    name:'zhangsan',
    age:20
}
const data2 = [1,2,3]
//observer(data)
observer(data2)

//Object.defineProperty一次性递归到底 计算量大   
//新增和删除不会监听到 defineProperty能力有限 需要Vue.set Vue.delete
function defineReactive(data,key,value){
    //深度监听 
    observer(value)
  Object.defineProperty(data,key,{
      get(){
          return value
      },
      set(newValue){
       if(newValue!==value){
           //设置新值也要深度监听 
        observer(newValue)
           value = newValue
           updateView()
       }
      }
      
  });
}
function observer(data){
    if(typeof data!=='object' ||  data == null){
        //非对象数组不监听
        return data
    }
    if(Array.isArray(data)){
        data._proto_=arrProto
    }
    //for in 遍历数组或对象
    for(let key in data){
        defineReactive(data,key,data[key])

    }
    //经过此函数，数据就可以变为响应式的了
}
function updateView(){
    console.log('更新视图');
}


//数组
//重新定义数组原型
const oldArrayPrototype = Array.prototype
//Object.create() 创建新对象，原型指向oldArrayPrototype,在扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayPrototype);
['push','pop','shift','unshift','splice'].forEach(methodName=>{
    arrProto[methodName] = function(){
        updateView()
        oldArrayPrototype[methodName].call(this,...arguments)
    }
    
})