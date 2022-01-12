import {
    ADD_NUMBER,
    SUB_NUMBER,
    INCREMENT,
    DECREMENT,
    CHANGE_BANNER,
  } from './constant.js';

const defaultState = {
    counter : 0,
    banner:[]
}
function reducer(state = defaultState,action){
  switch(action.type){
      case ADD_NUMBER:
          return {...state,counter:state.counter+action.num}
          case SUB_NUMBER:
            return { ...state, counter: state.counter - action.num };
          case INCREMENT:
            return { ...state, counter: state.counter + 1 };
          case DECREMENT:
            return { ...state, counter: state.counter - 1 };
          case CHANGE_BANNER:
            return { ...state, banner: action.banner };
          default:
            return state;
        }
  }
  
  export default reducer;