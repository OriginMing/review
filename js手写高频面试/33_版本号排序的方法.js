let arr =['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
arr.sort((a,b)=>{
    let i = 0;
    let arr =  a.split(".")
    let arr2 = b.split(".")
    while(true){
        let s1 = arr[i]
        let s2 = arr2[i]
        i++
        if(s1 == undefined || s2 ==undefined){
            return arr2.length - arr.length
        }
        if(s1 == s2) continue
        return s2 - s1
    }
})
console.log(arr);