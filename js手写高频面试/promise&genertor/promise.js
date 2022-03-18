const Status = {
  PENDING:'pengding',
  FUFILLED:"fulfilled",
  REJECTED:"reject",
}
class MyPromise{
  constructor(exector){
    this._value = undefined;
    this._reason = undefined;
    this._status = Status.PENDING;
    this._queueResolve = []; // 一个 promise的多个then都可以执行 eg: promise.then(res=>{})  promise.then(res=>{})
    this._queueReject = [];
     const resolve = (value)=>{
       queueMicrotask(()=>{
        if(this._status==Status.PENDING){
          //  只有是pending状态才会执行
           this._status = Status.FUFILLED;
           this._value =value;
           this._queueResolve.forEach(fn=>{
             fn(this._value)
           })
         }
       })
    }
    const reject = (reason)=>{
      queueMicrotask(()=>{
        if(this._status==Status.PENDING){
          //  只有是pending状态才会执行
           this._status = Status.REJECTED;
           this._reason =reason;
           this._queueReject.forEach(fn=>{
            fn(this._reason)
          })
         }
      })
    }
    try {
       exector(resolve,reject)
    } catch (error) {
        reject(error)
    }
  }
  then(onFulfilled,onRejected){
    typeof onFulfilled != 'function'? value=>value:null;
    typeof onRejected != 'function'?onRejected = error => {throw error}:null;
    return new MyPromise((resolve,reject)=>{
       const handleResolve = (value)=>{
         try {
          const x = onFulfilled(value);
          x instanceof MyPromise?x.then(resolve,reject):resolve(x)
         } catch (error) {
          reject(error)
         }
       }
       const handleReject = (reason)=>{
        try {
          const x = onRejected(reason);
          x instanceof MyPromise?x.then(resolve,reject):resolve(x)
        } catch (error) {
           reject(error)
        }
       }
       switch (this._status) {
         case Status.PENDING:
           this._queueResolve.push(handleResolve)
           this._queueReject.push(handleReject)
         break;
         case Status.REJECTED:
          handleReject(this._reason)
         break;
         case Status.FUFILLED:
           handleResolve(this._value)
         break;
       }
    })
  }
  catch(onRejected){
    return  this.then(undefined,onRejected)
  }
  finally(onFinally){
     return this.then(onFinally,onFinally)
  }
  static resolve(value){
    // 如果是promise那就直接返回 等待其状态改变，否则 创建promise并resolve掉
    return value instanceof MyPromise?value: new MyPromise((resolve,reject)=>{resolve(value)})
  }
  static reject(error){
  //  原生的promise.reject 也是直接将其reject掉
    return new MyPromise((resolve,reject)=>{
      reject(error)
    })
  }
  static all(promiseArr){
    // 等待所有的reslove或者一个reject
    let result =[]
    return new MyPromise((resolve,reject)=>{
      promiseArr.forEach(item=>{
        item.then(res=>{
          result.push(res)
          if(result.length ==promiseArr.length){
             resolve(result)
          }
        },err=>{
          reject(err)
        })
        
      })
    })
  }
  static allSetteled(promiseArr){
  //allsetteled,等所有的结束 都resolve不执行reject 
  let result = [];
   return new MyPromise((resolve,reject)=>{
    promiseArr.forEach(item=>{
      item.then(res=>{
         result.push(res)
         if(promiseArr.length ==result.length){
          resolve(result)
         }
      },err=>{
        result.push(err)
        if(promiseArr.length ==result.length){
          resolve(result)
        }
      })
    })
   })
  }
  static race(promiseArr){
    // 哪个先结束就返回那个
    return new MyPromise((resolve,reject)=>{
      promiseArr.forEach(item=>{
        item.then(res=>{resolve(res)},err=>{reject(err)})
      })
    })
  }
  static any(promiseArr){
    //any至少有一个resolve
   let result = []
  return new MyPromise((resolve,reject)=>{
    promiseArr.forEach(promise=>{
      promise.then(res=>{
        resolve(res)
      },err=>{
        result.push(err)
        if(promiseArr.length == result.length){
          reject(new AggregateError(result))
        }
      })
    })
  })
  }

}





