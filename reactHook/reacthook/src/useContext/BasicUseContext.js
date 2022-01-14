import React, { PureComponent, useContext } from 'react'
import {ThemContext,UserContext} from '../context'
export default function BasicUseContext() {
    const user = useContext(UserContext)
    const them = useContext(ThemContext)
    return (
        <div>
            <h2>user:{user.name}{user.age}</h2>
            <h2>them:{them.fontSize}{them.color}</h2>
        </div>
    )
}
/* export default class BasicUseContext extends PureComponent {
    render(){
        console.log(this.context)
        return(
            <div>
                <h2>哈哈哈</h2>
            </div>
        )
    } 
} */
/* BasicUseContext.contextType = UserContext;
BasicUseContext.contextType = ThemContext */ //此会覆盖

