
function imitateSet(fn,duration){
  let timer = null;
   function interVal(){
        fn();
        timer  = setTimeout(()=>{
            interVal()
        },duration)
} 
interVal();
return {
    cancel:()=>{
      clearTimeout(timer)
    }
  }
}
let a =  imitateSet(()=>{
    console.log("111");
},1000)
a.cancel()

/* 扩展：我们能反过来使用 setinterval 模拟实现 settimeout 吗？ */
function imitateSetTimeout(fn,duration){
  const   timer  =    setInterval(()=>{
        clearInterval(timer)
        fn()
        },duration)
}
imitateSetTimeout(()=>{
    console.log("xxx")
},2000)


