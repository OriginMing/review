import {
    ADD_NUMBER,
    SUB_NUMBER,
    INCREMENT,
    DECREMENT,
    CHANGE_BANNER
  } from './constant.js';

const homeState = {
    counter : 0
}
function homeReducer(state = homeState,action){
  switch(action.type){
      case ADD_NUMBER:
          return {...state,counter:state.counter+action.num}
          case SUB_NUMBER:
            return { ...state, counter: state.counter - action.num };
          case INCREMENT:
            return { ...state, counter: state.counter + 1 };
          case DECREMENT:
            return { ...state, counter: state.counter - 1 };
          default:
            return state;
        }
  }
  const bannerState = {
    banner : []
}
  function bannerReducer(state = bannerState,action){
    switch(action.type){
        case CHANGE_BANNER:
            state.banner.push(action.banner)
            return { ...state};
            default:
              return state;
          }
    }
    function reducer(state = {},action){
        return{
            homeInfo:homeReducer(state.homeInfo,action),
            bannerInfo :bannerReducer(state.bannerInfo,action)
        }
    }
  export default reducer;