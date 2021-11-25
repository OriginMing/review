
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
        this._resolveQueue = [];
        this.onRejectedCallbacks= [];
        const resolve = (value)=>{
            const run = () => {
                if(this._status==Status.PENDING){
                    this._status = Status.FUFILLED
                    this._value = value
             while (this._resolveQueue.length) {
                const callback = this._resolveQueue.shift()
                callback(value)
            }
                }
            }
            setTimeout(run)
        }
        const reject = reason => {
            const run = () => {
                if (this._status === Status.PENDING) {
                this._status = Status.REJECTED
                this._reason = reason
                while (this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift()
                    callback(reason)
                }
        }
    }
    setTimeout(run)
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
          // 根据规范，如果then的参数不是function，则忽略它, 让值继续往下传递，链式调用继续往下执行
        typeof onFulfilled !== 'function' ? onFulfilled = value => value : null
        typeof onRejected !== 'function' ? onRejected = error => error : null
      /*   if (this._status === Status.FUFILLED) {
          onFulfilled(this._value)
        }
        if (this._status === Status.REJECTED) {
         onRejected(this._reason)
        }
        if (this._status === Status.PENDING) {
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onResolvedCallbacks.push(() => {
              onFulfilled(this._value)
            });
      
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onRejectedCallbacks.push(()=> {
              onRejected(this._reason);
            })
          } */
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
              x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            } catch (error) {
              reject(error)
            }
          }
          switch (this._status) {
            case STATUS.PENDING:
              this._resolveQueue.push(resolveFn)
              this._rejectQueue.push(rejectFn)
              break;
            case STATUS.FULFILLED:
              resolveFn(this._value)
              break;
            case STATUS.REJECTED:
              rejectFn(this._value)
              break;
          }

        })
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
 static all(promiseArr) {
    let count = 0
    let result = []
    return new MyPromise((resolve, reject) =>       {
      if (!promiseArr.length) {
        return resolve(result)
      }
      promiseArr.forEach((p, i) => {
        MyPromise.resolve(p).then(value => {
          count++
          result[i] = value
          if (count === promiseArr.length) {
            resolve(result)
          }
        }, error => {
          reject(error)
        })
      })
    })
  }
 // 静态race方法
 static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(p => {
        MyPromise.resolve(p).then(value => {
          resolve(value)
        }, error => {
          reject(error)
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
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功');
    },1000);
  }).then(
    (data) => {
      console.log('success', data)
    },
    (err) => {
      console.log('faild', err)
    }
  )