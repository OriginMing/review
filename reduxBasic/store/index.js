import redux  from "redux"
//import reducer from './reducer.js';
import reducer from "./reducercombine.js"
const store =  redux.createStore(reducer)
export default store