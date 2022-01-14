useCallback实际的目的是为了进行性能的优化,通常使用useCallback的目的是不希望子组件进行多次渲染，并不是为了函数进行缓存
useCallback会返回一个函数的 memoized（记忆的） 值；
useCallback在什么时候使用? 
场景: 在将一个组件中的函数, 传递给子元素进行回调使用时, 使用useCallback对函数进行处理.

 // 默认的  父元素 重新渲染 子组件一定发生重新渲染 memo包裹的函数子组件或者继承自Purecomponent的类子组件,会通过==比较props的值来确定是否发生重新渲染， 而 useCallback，依赖的值没有发生变化时 可以返回同一个函数，使得子组件避免发生不必要的渲染