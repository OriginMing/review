// Array.prototype.myFlat = function(deep){
//   let res = []
//   for(let i =0;i<this.length;i++){
//       if(Array.isArray(this[i])&&deep){
//         res = res.concat(this[i].myFlat(deep-1))
//       }else{
//           res.push(this[i])
//       }
//   }
//   return res
// }
// let arr1 = [1, 2,[3,1],[2,3,4,[2,3,4]]]
// let res =  arr1.myFlat(1)
// console.log(res);

/* function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce(
    (pre, cur) =>
      Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
    []
  );
} */
 console.log(flatter([[[1,2],3],4]))
 /* 扩展思考：能用迭代的思路去实现吗? */
 function flatter(arr) {
  if (!arr.length) return;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

