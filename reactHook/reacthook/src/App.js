import { createContext } from "react";
import SwitchTransitionDemo from "./transition/switchTransition";
import TransitionGroupDemo from "./transition/TransitionGroupDemo";
import ReactIm from './React/index'
import ReactImm from './React/非受控'
import Ford from './React/forwordRef'
import Fun from './React/父子传参函数'
import Tai from './React/tai'
import UseRefAndCre from './React/useRef和createRef'
import UseContext from './React/UseContext'
import BasicUseImperativeHandle from "./useImperativeHandle/BasicUseImperativeHandle";
/* import BasicUseState from "./useState/BasicUseState" */
/* import BasicUseEffect from "./useEffect/BasicUseEffect"; */
import BasicUseContext from "./useContext/BasicUseContext";
/* import BasicUseReducer from "./useReducer/BasicUseReducer"; */
/* import BasicUseCallback from "./useCallback/BasicUseCallback";

 */
/* import BasicUseMemo from "./useMemo/BasicUseMemo"; */
/* import BasicUseRef from "./useRef/BasicUseRef"; */
import UserHome from "./高阶组件/UserHome"
import {ThemContext,UserContext} from "./context"
import AboutArrow from './React/aboutArrowFun'

function App() {
  return (
    <div className="App">
         {/* <BasicUseState/> */}

         {/* <BasicUseEffect/> */}

        {/*  <UserContext.Provider value={{name:"xxxx",age:"18"}}>
         <ThemContext.Provider value={{fontSize:"30px",color:"red"}}>
         <BasicUseContext/> 
         </ThemContext.Provider>
         </UserContext.Provider>
 */}
      
   
      {/*   <BasicUseReducer/> */}

    {/*   {<BasicUseCallback/>} */}

    {/* <BasicUseMemo/> */}
    {/* <BasicUseRef/> */}
    
    {/* <BasicUseImperativeHandle/> */}
    {/* <SwitchTransitionDemo></SwitchTransitionDemo>
    <TransitionGroupDemo></TransitionGroupDemo> */}

   {/* <UserContext.Provider value={{name:"xxxx",age:"18"}}>
         <ThemContext.Provider value={{fontSize:"30px",color:"red"}}>
         <UserHome/> 
         </ThemContext.Provider>
         </UserContext.Provider> */}
{/* <ReactIm></ReactIm> */}
{/* <ReactImm></ReactImm>
<Ford></Ford> */}
{/* <Fun></Fun> */}
{/* <Tai></Tai> */}
{/* <UseRefAndCre></UseRefAndCre> */}
<ThemContext.Provider  value={{color:"xxx"}}>
<UseContext></UseContext>
</ThemContext.Provider>

{/* <AboutArrow></AboutArrow> */}
    </div>
  );
}

export default App;
