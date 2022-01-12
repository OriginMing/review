import {createStore,applyMiddleware,compose} from "redux"
import createSagaMiddleware from "redux-saga"
import thunkMiddleware from "redux-thunk"
import reducer from './reducer.js';
import mySaga from "./saga"
//const store =  createStore(reducer)
const sagaMiddleware =  createSagaMiddleware()
/* redux-thunk使用 */
/* 添加redux-saga */
const storeEnhancer = applyMiddleware(thunkMiddleware,sagaMiddleware);
const store =  createStore(reducer,storeEnhancer)
/* redux-thunk 使用，以及在浏览器中使用redux-dev-tools */
/* 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const store =  createStore(reducer,composeEnhancers(storeEnhancer)) */
sagaMiddleware.run(mySaga)

export default store