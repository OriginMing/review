# react-router是router的 核心代码
# react-router-dom 浏览器
# react-router-native 原生应用
# react-router-config  import { renderRoutes, matchRoutes } from 'react-router-config';  matchRoutes辅助函数
路由跳转传参方式 ：  /:id  动态路由    search方式  state方式
switch  匹配到一个会立即停止，如果都没匹配到会展示最后一个
Navlink 比 Link 多许多属性

通过 react-router跳转 渲染的页面 可以 通过 props拿到信息 
如果 通过一般的js渲染的 需要使用 高阶组件 withRouter(App) 包裹，并且该组件需要用route包裹  才能 通过 props拿到信息


```
const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About,
    routes: [
      {
        path: "/about",
        exact: true,
        component: AboutHisotry
      },
      {
        path: "/about/culture",
        component: AboutCulture
      },
      {
        path: "/about/contact",
        component: AboutContact
      },
      {
        path: "/about/join",
        component: AboutJoin
      },
    ]
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/user",
    component: User
  }
]

  {renderRoutes(routes)}
   {renderRoutes(this.props.route.routes)} //子路由
```