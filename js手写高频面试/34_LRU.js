class Lru{
    constructor(maxSize){
      this.maxSize = maxSize;
      this.secretKey = new Map()
    }
    get(key){
        if(this.secretKey.get(key)){
           let tempValue = this.secretKey.get(key);
           this.secretKey.delete(key)
           this.secretKey.set(key,tempValue)
           return tempValue
         }else{
           return -1  
        }
    }
    put(key,value){
        if(this.secretKey.has(key)){
            this.secretKey.delete(key);
            this.secretKey.set(key,value)
        }else if(this.secretKey.size < this.maxSize){
            this.secretKey.set(key,value)
        }else{
            this.secretKey.delete(this.secretKey.keys().next().value)
        }
    }
}