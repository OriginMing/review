function myInstanceOF(left,right){
    while (true) {
        if(left == null){
            return false
        }else if(left.__proto__ == right.prototype){
            return true
        }
        left = left.__proto__
    }
}
let a =  myInstanceOF({},WeakMap)
console.log(a);