# npm init
# npm install redux
store.subscribe的回调函数，只要store发生变化，回调函数就会执行
通过redux.createStore(reducer)，创建store，store.dispath(一个对象),这个对象会作为reducer函数的第二个参数传入，改变store中的state