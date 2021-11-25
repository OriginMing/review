Array.prototype.myMap = function(fn,thisArg){
    let res = []
    thisArg = thisArg||{}
    this.reduce((acc,cur,index,source)=>{
        res.push(fn.call(thisArg,cur,index,source))
    },[])
    return res
}
let result =  [1,2,3].myMap((item)=>{
    return item * 2
})
console.log(result);