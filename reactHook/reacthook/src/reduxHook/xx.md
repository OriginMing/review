```
```
直接通过 const {banners} =  useSelector(state=>({
    banners:state.banners
}),shallowEqual)
//shallowEqual浅层比较 ,而不是 采用默认 的 === 比较  ===比较 因为 函数每次调用都会产生新的对象所以 ===比较会使没有依赖的数据变化时，也会发生重新渲染，所以建议使用shallowEqual

const dispath =  useDispatch();
useEffect(()=>{
    dispatch(Action)
})

代替了 mapstate  以及connect