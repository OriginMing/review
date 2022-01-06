
const Status = {
    PENDING:'pending',
    FUFILLED:'fufilled',
    REJECTED:'rejected'
}
class MyPromise{
    constructor(executor){
        this._status = Status.PENDING;
        this._value = undefined;
        this._reason = undefined;
        this._resolveQueue = []; //resolve的所有函数,
        //promise.then()
        //promise.then()实现 多个 then里的都执行
        this._rejectQueue = []; 
        const resolve = (value)=>{
          queueMicrotask(() => {
            if(this._status==Status.PENDING){
              this._status = Status.FUFILLED
              this._value = value
              while (this._resolveQueue.length) {
              const callback = this._resolveQueue.shift()
              callback(value)
         }
          }
          });
            //定时器保证执行前  then函数传递的函数已经被保存到 相应的队列里
            //promise 异步为 微任务 所以我们用 queueMicrotask代替
      
        }
        const reject = reason => {
                  queueMicrotask(() => {
                    if (this._status === Status.PENDING) {
                    this._status = Status.REJECTED
                    this._reason = reason
                    while (this._rejectQueue.length) {
                        const callback = this._rejectQueue.shift()
                        callback(reason)
                    }
                  }
                  });
        }
        //执行 代码中出错也会进入到 reject中
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
          // 根据规范，如果then的参数不是function，则将它变为函数,接收resolve的值, 让值继续往下传递，链式调用继续往下执行
        typeof onFulfilled !== 'function' ? onFulfilled = value => value : null
        typeof onRejected !== 'function' ? onRejected = error => {throw error} : null
/*       if (this._status === Status.FUFILLED) {
          onFulfilled(this._value)  //这样放在定时器里的 promise.then过来也可以被执行到
        }
        if (this._status === Status.REJECTED) {
         onRejected(this._reason)
        }
        if (this._status === Status.PENDING) {
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this._resolveQueue.push((data) => {
              onFulfilled(data)
            });
      
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this._rejectQueue.push((reason)=> {
              onRejected(reason);
            })
          }  */
          return new MyPromise((resolve, reject) => {
            const resolveFn = value => {
              try {
                const x = onFulfilled(value)
                // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
              } catch (error) {
                reject(error)
              }
            }
          const rejectFn = error => {
            try {
              const x = onRejected(error)
              x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)//promise 的 reject链式调用 return  也是reslove
            } catch (error) {
              reject(error)
            }
          }
          switch (this._status) {
            case Status.PENDING:
              this._resolveQueue.push(resolveFn)
              this._rejectQueue.push(rejectFn)
              break;
            case Status.FUFILLED:
              resolveFn(this._value)
              break;
            case Status.REJECTED:
              rejectFn(this._reason)
              break;
          }
        })
        }
    catch(onRejected){
     return  this.then(undefined,onRejected)
    }
    finally(onFinally){
      this.then(onFinally,onFinally)
    } 
// 静态resolve方法
 static resolve(value) {
    return value instanceof MyPromise ? value : new MyPromise(resolve => resolve(value))
}
// 静态reject方法
static reject(error) {
    return new MyPromise((resolve, reject) => reject(error))
  }
   // 静态all方法
   //Promise.all([p1,p2,p3])  //["p1res","p2res",""]
 static all(promiseArr) {
    let result = []
    return new MyPromise((resolve, reject) =>{
      if (!promiseArr.length) {
        return resolve(result)
      }
      promiseArr.forEach(promise => {
        promise.then(value => {
          result.push(value)
          if (result.length === promiseArr.length) {
            resolve(result)
          }
        }, error => {
          reject(error)
        })
      })
    })
  }
  //allsetteled,等所有的 都resolve不执行reject 

  static allSetteled(promiseArr) {
    let result = []
    return new MyPromise((resolve, reject) =>{
      if (!promiseArr.length) {
        return resolve(result)
      }
      promiseArr.forEach(promise => {
        promise.then(value => {
          result.push({Status:Status.FUFILLED,value:value})
          if (result.length === promiseArr.length) {
            resolve(result)
          }
        }, error => {
          result.push({Status:Status.REJECTED,reason:error})
          if (result.length === promiseArr.length) {
            resolve(result)
          }
        })
      })
    })
  }
 // 静态race方法
 static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(promise => {
        promise.then(value => {
          resolve(value)
        }, error => {
          reject(error)
        })
      })
    })
  }
//any至少有一个resolve
  static any(promiseArr) {
    let reason = []
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(promise => {
      promise.then(value => {
          resolve(value)
        }, error => {
          reason.push(error)
          if (result.length === promiseArr.length) {
          reject(new AggregateError(reason)) //AggregateError 需要浏览器来测,把所有的错误放在一块 通过.errors 取出来
          }
        })
      })
    })
  }
}
/* const testPromise = new MyPromise((resolve,reject)=>{
    reject('失败');
}).then((data)=>{
    console.log(data);
},(err)=>{
    console.log(err);
}) */
const promise = new MyPromise((resolve, reject) => {
     resolve('成功');
     //reject("shibai")
  })

  promise.then((data) => {console.log('success', data) },(err) => {console.log('faild', err)}).then((data)=>{console.log("success2",data)},(err)=>{console.log("faild2",err)})

/*  promise.then((data) => {console.log('success3', data) },(err) => {console.log('faild3', err)})
  setTimeout(() => {
    promise.then((data)=>{console.log("success4",data)},(err)=>{console.log("faild4",err)})
  }, 2000); */
  //promise.then()
  //promise.then()