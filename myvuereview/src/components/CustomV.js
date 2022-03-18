let MyPlugin = {}
MyPlugin.install = function(Vue,options){
     // 1.loazy load获取loading图；       
    let defaultSrc = options;
    Vue.directive('test',{
        inserted(el,binding){
            console.log(binding.value);
            console.log(binding.modifiers);
         el.focus()
        },
    })
    // 1.设置v-throttle自定义指令
    Vue.directive('throttle',{
        //<button v-throttle={time:1000,func:()=>{}}></button>
        bind(el,binding){
            let throttleTime = binding.value.time; // 防抖时间
            if(!throttleTime){
                throttleTime = 2000;
            }
            let timer;
            el.addEventListener('click',event=>{
                 if(!timer||Date.now()-timer>=throttleTime){
                    timer = Date.now();
                    binding.value.func()
                }
            })
        },
    })
    //2. loazy load
    Vue.directive('lazyimg',{
     bind(el,binding){
        el.src =defaultSrc
        console.log(defaultSrc);
     },
     inserted(el,binding){
        //  兼容处理，如果 浏览器支持 观察可视区 接口，就用 否则就滚动条
        if('IntersectionObserver' in window){
            MyPlugin.observe(el,binding.value);
        }else{
            MyPlugin.listenerScroll(el,binding.value);
        }
     }
    })  

    Vue.directive('copy',{
        bind(el, { value }) {
            el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
            el.handler = () => {
              if (!el.$value) {
              // 值为空的时候，给出提示，我这里的提示是用的 ant-design-vue 的提示，你们随意
                console.log('无复制内容');
                return;
              }
              // 动态创建 textarea 标签
              const textarea = document.createElement('textarea');
              // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
              textarea.readOnly = 'readonly';
              textarea.style.position = 'absolute';
              textarea.style.left = '-9999px';
              // 将要 copy 的值赋给 textarea 标签的 value 属性
              textarea.value = el.$value;
              // 将 textarea 插入到 body 中
              document.body.appendChild(textarea);
              // 选中值并复制
              textarea.select();
              // textarea.setSelectionRange(0, textarea.value.length);
              const result = document.execCommand('Copy');
              if (result) {
                Message.success('复制成功');
              }
              document.body.removeChild(textarea);
            };
            // 绑定点击事件，就是所谓的一键 copy 啦
            el.addEventListener('click', el.handler);
          },
          // 当传进来的值更新的时候触发
       componentUpdated(el, { value }) {
     console.log(value);
    el.$value = value;
    },
          unbind(el) {
            el.removeEventListener('click', el.handler);
          },
    })
}
MyPlugin.listenerScroll = function(el,realSrc){
    let handler = MyPlugin.throttle(MyPlugin.load,300)
    handler(el,realSrc);//先加载首屏
    window.addEventListener('scroll',() => {
        handler(el,realSrc);
    });
}
MyPlugin.load = function(el,realSrc){
  let viewHeight  =  document.documentElement.clientHeight; 
  let elHeight  = el.offsetTop ;
  let scrollHeight =  document.documentElement.scrollTop || document.body.scrollTop;
  console.log(el.offsetTop);

  if(viewHeight+scrollHeight>=elHeight){
    el.src=realSrc
  }
}
MyPlugin.observe = function(el,realSrc){
    let io = new IntersectionObserver(entries => {
        console.log(entries[0].intersectionRatio);
        let img =  entries[0].target
        console.log(el);
        if(entries[0].intersectionRatio > 0){
            //进入可见区域 加载图片
            el.src=realSrc
        }
    });
    io.observe(el);  // 监听当前元素
}
MyPlugin.throttle=function(func,time){
    let timer;
     return function(){
    if(timer){
    return
    }
    var arg = arguments;
    timer=setTimeout(function(){
    func.apply(null,arg);
    clearTimeout(timer)
    timer=null;
    },time)
    }
    
    

}
export default MyPlugin

// 一键拷贝  <button v-copy="copyText">copy</button> copyText为变量