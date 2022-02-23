import React, { useMemo,useState,memo } from 'react'
const MyButton =memo((props) => {
    console.log("Button重新渲染: " + props.title);
    return <button >{props.info.age}</button>
  })
export default function BasicUseMemo() {
    const [show, setShow] = useState(true);
    const info = useMemo(()=>{
       return {age:"18"}
    },[])
    return (
        <div>
             <MyButton info={info} title="info"></MyButton>
             <button onClick={e => setShow(!show)}>show切换</button>
        </div>
    )
}

