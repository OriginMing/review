import React from 'react'
import {NavLink,Switch,Route} from "react-router-dom"
function History(){
    return (<div>History</div>)
}
function Culture(){
    return (<div>Culture</div>)
}
function Connect(){
    return (<div>Connect</div>)
}
export default function about(props) {
    console.log(props)
    return (
        <div>
             <h2>About</h2>
             <div>
             <NavLink exact to="/about">文化</NavLink>
             <NavLink to="/about/history">历史</NavLink>
             <button onClick={(e)=>{props.history.push("/about/connect")}}>加入我们</button>
             </div>
             <Switch>
                 <Route exact path="/about" component={Culture} ></Route>
                 <Route path="/about/history" component = {History}></Route>
                 <Route path="/about/connect" component = {Connect}></Route>
             </Switch>
        </div>
    )
}

