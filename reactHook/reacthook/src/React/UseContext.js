import React ,{ useContext,contextType} from "react"
import { ThemContext } from "../context"

// export default function App(){
//  let Them =    useContext(ThemContext)
//  console.log(Them);
//     return (<>
//     {Them.color}
//     </>)
// }

export default class App extends React.Component{
    constructor(props,context){
        super(props,context)
        console.log(context.getState());
    }
   render(){
       console.log(this.context.getState());
       return (<>
       <h2>{JSON.stringify(this.context)}</h2>
       </>)
   }
}
App.contextType = ThemContext

