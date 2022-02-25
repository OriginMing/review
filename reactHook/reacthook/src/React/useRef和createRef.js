import React ,{createRef, useEffect, useRef,useState} from "react";
import { usePrevious } from "./封装hook/usePrevious";
export default function App(){
    // 这种 每次重新渲染都会产生一个新的 handelAlert 函数 每个里面都保存了自己的count值 所以alert和界面显示不一样
    //可以用 useRef 
    const [count,setCount] = useState(0)
    const [counte,setCounte] = useState(0)
    const lastCount = useRef(count)
    function handelAlert(e){
        setTimeout(()=>{
            alert(count)
        },3000)
    } 
    // 使用useRef    
    useEffect(()=>{
        lastCount.current = count
        //setCounte(count)
    })
    function refAlert(){
        setTimeout(()=>{
         alert(lastCount.current)
        },3000)
    }
    return (<>
     <h2>你点击了{count}次按钮{lastCount.current}</h2>
     <button onClick={()=>{setCount(pre=>pre+1)}}>点击</button>
     <button onClick={handelAlert}>alert 展示点击了多少次</button>
     <button onClick={refAlert}>refAlert 展示点击了多少次</button>
    </>)
}

//  export default function App(){
//      const [count,setCount] = useState(1)
//      const createRefImp  = createRef()
//      const useRefImp = useRef()
//      useEffect(()=>{
//         useRefImp.current=count
//         console.log(useRefImp.current);
//      })
//      if(!createRefImp.current){
//         createRefImp.current = count
//      }
//      if(!useRefImp.current){
//          //我们发现重新渲染 useRef的值不会变化，值一直存在(类似于 this ) , 无法重新赋值. 
//          //要想重新渲染 我们需要useEffect中每次重新渲染重新赋值
//         useRefImp.current = count
//      }
//     return (<>
//        <h2>{count}</h2>
//        <h2>createRef展示的值{createRefImp.current}</h2>   
//        <h2>useRef展示的值{useRefImp.current}</h2>
//        <button onClick={()=>{setCount(pre=>pre+1)}}>counter++</button>
//     </>)
//  }


// 测试 usePrevious
// export default function App(){
//   const [count,setCount] = useState(0);
//   const preV = usePrevious(count);
//   return (
//       <>
//        pre:{preV} <h2>当前{count}</h2>
//       <button onClick={()=>{setCount(count=>count+1)}}>+1</button>
//       <button onClick={()=>{setCount(count=>count-1)}}>-1</button>
//       </>
//   )
// }