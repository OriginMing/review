import {
    ADD_NUMBER,
    SUB_NUMBER,
    INCREMENT,
    DECREMENT,
    CHANGE_BANNER
  } from './constant.js';

export const addAction = num => ({
    type: ADD_NUMBER,
    num
  });
  
  export const subAction = num => ({
    type: SUB_NUMBER,
    num
  });
  
  export const incAction = () => ({
    type: INCREMENT
  });
  
  export const decAction = () => ({
    type: DECREMENT
  });
    // combine test
  export const chanAction = (num) => ({
    type: CHANGE_BANNER,
    banner:num
  });