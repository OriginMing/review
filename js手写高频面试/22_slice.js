 function slice(arr){
    return new Proxy(arr,{  
      get(target, key) {
        const words = key.split(':');
        return target.slice(words[0],words[1])
  },
  })
}

const arr = slice([1,2,3,5,4,6,9])
let a = arr['2:5'] //[3,5,4] 请注意使用的语法不是小括号而是中括号
console.log(a); 
 
