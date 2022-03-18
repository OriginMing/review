// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
//  var permute = function(nums) {
//     let track = [];
//     let res =[];
//     function backtrack(array,trackArr){
//       if(trackArr.length==nums.length){
//            res.push([...trackArr]);
//            return
//       }
//       for(let i =0;i<array.length;i++){
//           if(trackArr.includes(array[i])){
//              continue;
//           }
//           trackArr.push(array[i])
//           backtrack(array,trackArr)
//           trackArr.pop()
//       }
//       console.log(res);
//     }
//     backtrack(nums,track)
//  };
// permute([1,2,3])
