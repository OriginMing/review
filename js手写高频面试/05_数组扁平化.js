Array.prototype.myFlat = function(deep){
  let res = []
  for(let i =0;i<this.length;i++){
      if(Array.isArray(this[i])&&deep){
        res = res.concat(this[i].myFlat(deep-1))
      }else{
          res.push(this[i])
      }
  }
  return res
}
let arr1 = [1, 2,[3,1],[2,3,4,[2,3,4]]]
let res =  arr1.myFlat(1)
console.log(res);