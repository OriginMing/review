import store from './store/index.js';

import {
  subAction
} from './store/actionCreate.js';

// 封装patchLogging的代码
function patchLogging(store) {
  const next = store.dispatch;
  console.log("patchLogging",next)
  function dispatchAndLogging(action) {
    console.log("dispatch前---dispatching action:", action);
    next(action);
    console.log("dispatch后---new state:", store.getState());
  }
  return dispatchAndLogging;
}

// 封装patchThunk的功能
function patchThunk(store) {
  const next = store.dispatch;
  console.log("patchThunk",next)
  function dispatchAndThunk(action) {
    if (typeof action === "function") {
      action(store.dispatch, store.getState)
    } else {
      console.log("object")
      next(action);
    }
  }
  return dispatchAndThunk;
}
// 5.封装applyMiddleware
function applyMiddlewares(...middlewares) {
  middlewares.forEach(middleware => {
    store.dispatch = middleware(store);
  })
}

applyMiddlewares(patchLogging, patchThunk);

function foo(dispatch, getState) {
  dispatch(subAction(-10));
}

store.dispatch(foo);