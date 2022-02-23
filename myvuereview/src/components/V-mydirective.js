

 //懒加载指令
 //图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的
 //拿到所有的图片 Dom ，遍历每个图片判断当前图片是否到了可视区范围内
 //如果到了就设置图片的 src 属性，否则显示默认图片
 //一是绑定 srcoll 事件进行监听，二是使用 IntersectionObserver 判断图片是否到了可视区域，但是有浏览器兼容性问题。
 //https://cn.vuejs.org/v2/guide/plugins.html 

 //Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
const LazyLoad = {
  install(Vue,options){
    Vue.directive('lazyPc',{
         bind(el,binding){
          console.log(binding.value);
          LazyLoad.init(el, binding.value, options)
         },
   /*       inserted(el) {
          if (IntersectionObserver) {
            LazyLoad.observe(el)
          } else {
            LazyLoad.listenerScroll(el)
          }
        }, */
    })
  },
    // 初始化
    init(el, val, def) {
      el.setAttribute('data-src', val)
      el.setAttribute('src', def)
      el.src = val
      el.removeAttribute('data-src')
    },
 /*   // 利用IntersectionObserver监听el
   observe(el) {
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300)
    LazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
    // 加载真实图片
    load(el) {
      const windowHeight = document.documentElement.clientHeight
      const elTop = el.getBoundingClientRect().top
      const elBtm = el.getBoundingClientRect().bottom
      const realSrc = el.dataset.src
      if (elTop - windowHeight < 0 && elBtm > 0) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    },
      // 节流
  throttle(fn, delay) {
    let timer
    let prevTime
    return function (...args) {
      const currTime = Date.now()
      const context = this
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)
 
      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }
 
      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  }, */
}
export default LazyLoad