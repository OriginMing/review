import { useEffect, useRef } from "react"

const usePrevious = state =>{
    const ref = useRef();
    // 利用 页面重新渲染 useRef仍然是之前创建的值来实现
    useEffect(()=>{
        ref.current = state
        console.log(ref.current);
    })
    console.log(ref.current);
    return ref.current
}
export {usePrevious}