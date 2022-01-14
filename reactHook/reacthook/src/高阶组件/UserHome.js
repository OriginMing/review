import React, { PureComponent, createContext } from 'react';
import {UserContext,ThemContext} from "../context"
// 定义一个高阶组件  ,类组件 通过高阶组件 将多个context 映射到 props里
function withUser(WrappedComponent) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          user => {
            return (
                <ThemContext.Consumer>
                    {
                        them => {
                            return <WrappedComponent {...props} {...user} {...them}/>
                        }
                    }
                </ThemContext.Consumer>
            )
          } 
        }
      </UserContext.Consumer>
    )
  }
}


class Home extends PureComponent {
  render() {
      console.log(this.props)
    return <h2>Home:</h2>
  }
}




const UserHome = withUser(Home);

export default UserHome
