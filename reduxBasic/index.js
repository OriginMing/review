import store from "./store/index.js"

import {
    addAction,
    subAction,
    incAction,
    decAction,
    chanAction
  } from './store/actionCreate.js';
store.subscribe(() => {
    console.log(store.getState());
  })
/* store.dispatch(decAction())
store.dispatch(addAction(10));
store.dispatch(addAction(15));
store.dispatch(subAction(8));
store.dispatch(subAction(5));
store.dispatch(subAction(5)); */
store.dispatch(chanAction(4))
store.dispatch(chanAction(5))