跨组件通信：
import React, { PureComponent, createContext } from 'react';
const UserContext = createContext({
  nickname: "默认",
  level: -1,
  区域: "中国"
}); //默认值
<!-- 函数式组件用法 -->
 <UserContext.Provider value={{nickname: "why", level: 90, region: "中国"}}>
          <Home/>
          <About/>
</UserContext.Provider>

 <UserContext.Consumer>
        {
          user => {
            return <h2>About: {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}</h2>
          } 
        }
</UserContext.Consumer>
<!-- 类组件用法 --  不过只可以传递一个  contextType >
class Profile extends PureComponent{
  constructor(props,context){
     console.log(context); 
  }
  render(){
    console.log(this.context);
      return <>
       <h1>profile</h1>
      </>       
  }
}
Profile.contextType = UserContext
Profile.contextType = ThemeContext