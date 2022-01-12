//export default 生成器函数
import {takeEvery,put,all} from "redux-saga/effects"
import axios from "axios";
import {TEST_SGAG} from "./constant"
import {changeBannerAction} from './actionCreate'
 function* getData(){
   const res = yield  axios({
      url:"http://123.207.32.32:9001/banner"
   })
   yield put(changeBannerAction(res.data.banners))  // saga中的 put 相当于 redux dispath 
   //yield all([])//发出多个dsipatch
}
function* mySaga(){
     // takeLatest: 依次只能监听一个对应的action，只执行最后一个
       // takeEvery: 每一个都会被执行
   yield takeEvery(TEST_SGAG,getData)

   yield all([
      //yield takeEvery(TEST_SGAG,getData)
      // takeLatest(ADD_NUMBER, fetchHomeMultidata),
    ]);

}
export default mySaga;

//takeEvery 第一个参数为 需要拦截的action的Type,第二个参数为生成器函数