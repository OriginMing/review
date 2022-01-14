import React, { useReducer } from 'react'
 function reducer(state, action) {
    switch(action.type) {
      case "increment":
        return {...state, counter: state.counter + action.num};
      case "decrement":
        return {...state, counter: state.counter - 1};
      default:
        return state;
    }
  }
  export default function BasicUseReducer() {
    const [state, dispatch] = useReducer(reducer, {counter: 0});
      return (
          <div>
              当前值☞{state.counter}
              <button onClick={(e)=>{dispatch({type:"increment",num:10})}}>+10</button>
          </div>
      )
  }
  