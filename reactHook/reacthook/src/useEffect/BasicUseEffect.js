import React, { useEffect, useState } from 'react'

export default function BasicUseEffect() {
    let [counter,setCounter] = useState(10)
    let [num,setNum] = useState(10)
/*     useEffect(()=>{
      document.title = counter
    }) */ 

 /*    useEffect(() => {
        document.title = counter;
      },[])   */// 只会初次渲染时执行
      useEffect(() => {
        console.log("订阅一些事件");
        return () => {
          console.log("取消订阅事件")
        }
      }, []); 
      useEffect(()=>{
      document.title = counter
    },[counter]) //只有counter发生变化时执行
    return (
        <div>
            <button onClick={()=>setCounter(counter+1)}>counter+1</button>
            <button onClick={()=>setNum(num+1)}>改变num</button>
        </div>
    )
}
