//在JavaScript中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议
//在js中这个标准就是一个特定的next方法；
//next方法有如下要求：一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：
// done（boolean）
// 如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定 done 这个属性。）
// 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
// value：迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

const createIterator = (arr)=>{
    let index = 0
    return {
        next(){
           if(index<arr.length){
               return {done:false,value:arr[index++]}
           }else{
               return {done:true,value:undefined}
           }
        }
    }
}
let friends = ["xiaoming","xiaomeng"]
let friendsIterator = createIterator(friends);
// console.log(friendsIterator.next());console.log(friendsIterator.next());console.log(friendsIterator.next());
//可迭代对象
//对象中实现 [Symbol.iterator]函数

const info = {
    friends:["lili","gaga"],
    [Symbol.iterator]:function(){
        let index =0;
        return {
            next:()=>{
                if(index<this.friends.length){
                    return {done:false,value:this.friends[index++]}
                }else{
                    return {done:true,value:undefined}
                }
             },
             //我们想要监听中断的话，可以添加return方法
             return(){
                //  console.log("return被调用")s
                 return {done:true}
             }
        }
    }
}
for (const iterator of info) {
    //console.log(iterator)
    //测试中断
    if(iterator=="lili"){
        break
    }
}
// 关于生成器
//生成器事实上是一种特殊的迭代器；
//生成器函数的返回值是一个Generator（生成器)
// 生成器函数如下 
// 生成器传递参数,从第二个next调用开始传递
function *genertorFn(init){
    console.log("函数开始执行");
    const value = 100;
    console.log(value);
    let result1 = yield init+value;
    console.log(result1);
    // yield后面的值会做为结果返回
    //传递参数，那么这个参数会作为上一个yield语句的返回值
    const value2 = 200;
    yield value2
    console.log("结束")
}
let genertor =  genertorFn(1);
// console.log(genertor.next())
//生成器提前结束函数,return 参数 作为 返回值结果
// console.log(genertor.return(123))


// 使用生成器代替迭代器
function* createIteratorX(start,end){
    for (let i = start; i < end; i++) {
        yield i
    }
}

//事实上我们还可以使用yield*来生产一个可迭代对象：
//这个时候相当于是一种yield的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值
function *createIteratorY(arr){
    for (const iterator of object) {
        yield iterator
    }
}
function *createIteratorZ(arr){
    yield* arr
}


//我们需要向服务器发送网络请求获取数据，一共需要发送三次请求；
//第二次的请求url依赖于第一次的结果；
//第三次的请求url依赖于第二次的结果；
//依次类推；
function requestData(url){
    // 模拟网络请求
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(url)
        },1000)
    })
}
function getData(){
    requestData("第一次请求").then(res=>{
        console.log(res);
        return requestData(res+"第二次请求")
    }).then(res2=>{
        console.log(res2);
        return requestData(res2+"第三次请求")
    }).then(res3=>{
        console.log(res3);
    })
}
//getData()

function* getDataX(){
 const res1 = yield requestData("第一次请求")
 console.log(res1)
 const res2 = yield requestData(res1+"第二次请求")
 console.log(res2)
 const res3 = yield requestData(res2+"第三次请求")
 console.log(res3)
}
const generatorX = getDataX();
// generatorX.next().value.then(res=>{
//     generatorX.next(res).value.then(res2=>{
//         generatorX.next(res2).value.then(res3=>{
//             generatorX.next(res3)
//         })
//     })
// })
//第一，我们不能确定到底需要调用几层的Promise关系；
//第二，如果还有其他需要这样执行的函数，我们应该如何操作呢？
// 自动执行generator函数实现
function execGenertor(genFn){
  const genertor = genFn()
  function exec(res){
      const result = genertor.next(res)
      if(result.done){
          console.log(result);
      }else{
          result.value.then(res=>{
              exec(res)
          })
      }
  }
   exec()
}
execGenertor(getDataX)
