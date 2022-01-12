# 使用JSX必须导入React  JSX会转化成 React.createElement

# page/about home 最基础的联系方式，但是明显看出  home 和 about相似代码过多  

# 使用 connect 函数解耦 ，但是在connect 中  import strore from '../store',对业务逻辑有依赖，应该再次处理
# 通过共享方式拿到store而非直接导入的方式   about2
1.const StoreContext = React.createContext();
2.<StoreContext.Provider value={store}></StoreContext.Provider>      
3.EnhanceComponent.contextType  = StoreContext;   
那么 类中就可以 通过context拿到store

# 使用react-redux   about3

# 关于异步请求  home2

# home3中进行redux-thunk使用 将网络请求由组件转到action中

# redux-devtools的安装

# redux-saga  home4  
