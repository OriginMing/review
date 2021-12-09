/* function arrSet(arr){
   return  [...new Set(arr)]
}
function arrSet(arr){
    return  Array.from(new Set(arr))
 } */
 /* indexof */
 /* function arrSet(arr){
     let newArr = []
    arr.forEach(element => {
        newArr.indexOf(element)==-1 && newArr.push(element)
    });
    return newArr
 } */
 /* 利用对象键值唯一性 */
 function arrSet(arr){
     let obj = {};
     let res = []; 
     arr.forEach(element=>{
         if(!obj[element]){
             obj[element] =1;
             res.push(element)
         }
     })
     return res
 }
console.log(arrSet([1,2,3,4,1]));