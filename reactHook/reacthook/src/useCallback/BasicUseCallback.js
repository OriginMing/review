import React, { memo, useCallback, useState } from 'react'


const MyButton =memo((props) => {
    console.log("Button重新渲染: " + props.title);
    return <button onClick={props.increment}>{props.title}</button>
  })

export default function BasicUseCallback() {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);
    const increment = useCallback(() => {
        console.log("执行increment函数");
        setCount(count + 1);
      }, [count]);
      
     const increment2 = () => {
        console.log("执行increment2函数");
        setCount(count + 1);
     }
    return (
        <div>
              <h2>BasicUseCallback: {count}</h2>
              <button onClick={increment}>+1</button>
              <MyButton increment={increment} title ="increment"></MyButton>
              <MyButton increment={increment2} title="increment2"></MyButton>
             <button onClick={e => setShow(!show)}>show切换</button>
        </div>
    )
}
