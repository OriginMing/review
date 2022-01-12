import {useState} from "react"
import {HashRouter,Link,NavLink,Route,Switch,withRouter} from "react-router-dom"
//import classNames from "classnames"
import "./App.css"
import about from "./pages/about";
import detial from "./pages/detial";
import home from "./pages/home";
import login from "./pages/login";
import nomatch from "./pages/nomatch";
import user from "./pages/user";
function App(props) {
  const id ="abc"
  const linkState = [{to:"/",title:"首页"},{to:"/about",title:"关于"},{to:"/user",title:"用户"},{to:"/login",title:"登录"},{to:`detial/${id}`,title:"详情"}];
 let [iscurrent,setIsCurrent] =useState(0);
 console.log(props)
  return (
    <div className="App">
       {/*  <Link to="/" >首页</Link>
        <Link to="/about">关于</Link> */}
       {/*  {
          linkState.map((item,index)=>{
            return (
              <div className={classNames({"active":index===iscurrent})} key={index}>
            <Link to={item.to} onClick={(e)=>{setIsCurrent(index);console.log(index)}}>{item.title}</Link>
              </div>
              )
          })

        } */}
            { linkState.map((item,index)=>{
            return (
              /* activeClassName="link-active" */
            <NavLink  exact={index===0} activeClassName="link-active"  to={item.to} onClick={(e)=>{setIsCurrent(index);console.log(index)}}>{item.title}</NavLink>
              )
          })
          }
           <NavLink to="/detial2?name=wm&age=18">详情二  props.localtion.search search方式</NavLink>
           <NavLink to={{pathname:"",search:"?name=wm",state:{name:"xx"}}}>详情二  props.localtion.state state方式</NavLink>
          <Switch>
        <Route exact path="/" component={home}  />
        <Route  path="/about" component={about} />
        <Route  path="/login" component={login}  />
        <Route path="/user" component={user} />
        <Route path="/detial/:id" component={detial} />
        <Route component={nomatch} />
        </Switch>
    </div>
  );
}



export default withRouter(App);
