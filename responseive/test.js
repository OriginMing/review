let obj = {}
let name = 'zhangsan'

Object.defineProperty(obj,'xxx',{
    get(){
        return name
    },
    set(value){
        name = value
    }
})
console.log(obj.xxx);
obj.xxx = 'hahah'
console.log(obj.xxx);