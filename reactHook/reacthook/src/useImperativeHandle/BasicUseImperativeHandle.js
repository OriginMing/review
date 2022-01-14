import React, { useRef,forwardRef,useImperativeHandle } from 'react'

const MyInput = forwardRef((props,ref)=>{
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }), [inputRef])
    return (
        <div>
            <input type="text" ref={inputRef}/>
        </div>
    )
  })
 

export default function BasicUseImperativeHandle() {
    const inputRef =  useRef()
    function changeDom(){
        console.log(inputRef.current)
        inputRef.current.focus()
    }
    return (
        <div>
            <MyInput ref={inputRef} />
            <button onClick={changeDom}>function聚焦</button>
        </div>
    )
}
