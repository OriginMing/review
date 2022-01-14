import React, { useState } from 'react'

export default function BasicUseState() {
    let [counter,setCounter] =  useState(0);
    const [user, setUser] = useState([
        {  name: "wm", age: 18 },
        {  name: "wm", age: 18 },
      ])
      function changeAge(index){
          const newUser = [...user];
          newUser[index].age+=1;
          setUser(newUser)
      }
      function changeCounter(){
          // setCounter(count + 10);
        // setCounter(count + 10);
       // setCounter(count + 10);
    // setCounter(count + 10);
    /* 上面的方法 会合并为一个 最终结果只会增加10 */
        setCounter((prevCount) => prevCount + 10);
        setCounter((prevCount) => prevCount + 10);
        setCounter((prevCount) => prevCount + 10);
        setCounter((prevCount) => prevCount + 10);
      }
    return (
        <div>
            <div>数据:{counter}</div>
            <button onClick={()=>setCounter(counter+10)}>数据+10</button>
            <button onClick={changeCounter}>数据+40</button>
            <h2>user list</h2>
            {
                user.map((item,index)=>{
                    return <div style={{display:"flex"}}><li>{item.name}:{item.age}</li><button onClick={(e)=>{changeAge(index)}}>age+1</button></div> 
                })
            }
        </div>
    )
}
