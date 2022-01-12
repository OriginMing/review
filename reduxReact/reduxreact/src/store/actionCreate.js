import axios from "axios"
import {
    ADD_NUMBER,
    SUB_NUMBER,
    INCREMENT,
    DECREMENT,
    CHANGE_BANNER,
    TEST_SGAG
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
  export const changeBannerAction = banner => ({
    type: CHANGE_BANNER,
    banner
  });

  export const  sendBannerRequest = (dispatch,getState) => {
    console.log(getState())
    axios({
      url:"http://123.207.32.32:9001/banner"
   }).then(res=>{
       console.log(res.data.banners)
       dispatch(changeBannerAction(res.data.banners))
   })
  }

  // redux-saga拦截的action
export const testSaga={
  type:TEST_SGAG
 }