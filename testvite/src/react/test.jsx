import React,{useState} from 'react'
export default function(){
    let [state,setState] =useState(0)
    return(
      <>
      <h1>{state}</h1>
      <button onClick={()=>{setState(++state)}}>+1</button>
      </>
  )
}