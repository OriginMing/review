import React, { useRef,forwardRef,createRef } from 'react'

const MyInput = forwardRef((props,ref)=>{
    return (
        <div>
            <input type="text" ref={ref}/>
        </div>
    )
  })
  class MyClassInput extends React.Component{
    constructor(props){
       super(props);
       this.inputRef = createRef();
    }
     render(){
         return (
             <div>
            <input type="text" ref={this.inputRef}/>
             </div>
         )
     }
  }

export default function BasicUseRef() {
    const inputRef =  useRef()
    const inputClassRef =  useRef()
    function changeDom2(){
      inputClassRef.current.inputRef.current.focus()
       
    }
    function changeDom(){
        console.log(inputRef.current);
        inputRef.current.focus()
    }
    return (
        <div>
            <MyInput ref={inputRef} />
            <MyClassInput ref={inputClassRef}/>
            <button onClick={changeDom}>function聚焦</button>
            <button onClick={changeDom2}>class聚焦</button>
        </div>
    )
}
