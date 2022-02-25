useRef用法一：引入DOM（或者组件，但是需要是class组件）元素；
用法二：保存一个数据，这个对象在整个生命周期中可以保存不变

不能 直接   <MyInput ref={inputRef} /> 这种方式 不能在函数式组件上使用ref属性，因为他们没有实例,要使用需要使用高阶函数forwardRef包裹
forwardRef第二个参数就可以接收到传过的ref
    