# useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新；
# useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新
// 此例子中   useEffect 会在setCount后页面重新渲染后执行 再次setCount所以会有闪烁 Dom表现：10->0->random的过程
useLayoutEffect 会在setCount后 内容更新到DOM上之前执行 所以 不会有闪烁   Dom表现：10->random的过程