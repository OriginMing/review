{
    let b = 1;
}
console.log(process.argv.slice(2));

function foo() {
    console.error('foo');
}
function bar() {
    console.error('bar');
}
setTimeout(bar, 0);
process.nextTick(foo);





var findLHS = function(nums) {
    let a = []
    nums.map((item,index)=>{
        nums.map((item2,index2)=>{
          a[index] = {item:item,count:0}
        if((item+1==item2)||(item-1==item2)){ 
            a[index].count++
        }
        })
    })
};


































// const LazyLoad = {
//     // install方法
//     install(Vue,options){
//     	  // 代替图片的loading图
//         let defaultSrc = options.default;
//         Vue.directive('lazy',{
//             bind(el,binding){
//                 LazyLoad.init(el,binding.value,defaultSrc);
//             },
//             inserted(el){
//                 // 兼容处理
//                 if('IntersectionObserver' in window){
//                     LazyLoad.observe(el);
//                 }else{
//                     LazyLoad.listenerScroll(el);
//                 }
                
//             },
//         })
//     },
//     // 初始化
//     init(el,val,def){
//         // data-src 储存真实src
//         el.setAttribute('data-src',val);
//         // 设置src为loading图
//         el.setAttribute('src',def);
//     },
//     // 利用IntersectionObserver监听el
//     observe(el){
//         let io = new IntersectionObserver(entries => {
//             let realSrc = el.dataset.src;
//             if(entries[0].isIntersecting){
//                 if(realSrc){
//                     el.src = realSrc;
//                     el.removeAttribute('data-src');
//                 }
//             }
//         });
//         io.observe(el);
//     },
//     // 监听scroll事件
//     listenerScroll(el){
//         let handler = LazyLoad.throttle(LazyLoad.load,300);
//         LazyLoad.load(el);
//         window.addEventListener('scroll',() => {
//             handler(el);
//         });
//     },
//     // 加载真实图片
//     load(el){
//         let windowHeight = document.documentElement.clientHeight
//         let elTop = el.getBoundingClientRect().top;
//         let elBtm = el.getBoundingClientRect().bottom;
//         let realSrc = el.dataset.src;
//         if(elTop - windowHeight<0&&elBtm > 0){
//             if(realSrc){
//                 el.src = realSrc;
//                 el.removeAttribute('data-src');
//             }
//         }
//     },
//     // 节流
//     throttle(fn,delay){
//         let timer; 
//         let prevTime;
//         return function(...args){
//             let currTime = Date.now();
//             let context = this;
//             if(!prevTime) prevTime = currTime;
//             clearTimeout(timer);
            
//             if(currTime - prevTime > delay){
//                 prevTime = currTime;
//                 fn.apply(context,args);
//                 clearTimeout(timer);
//                 return;
//             }

//             timer = setTimeout(function(){
//                 prevTime = Date.now();
//                 timer = null;
//                 fn.apply(context,args);
//             },delay);
//         }
//     }

// }
// export default LazyLoad;



/**
 * @param {string} 
 * @return {string}
 */
var longestPalindrome = function(s){
    // 创建二维数组
     var init2dArray = (w,h,val=null)=>
         Array(w).fill().map(()=>Array(h).fill(val))
     
     let len = s.length;
     if(len<2){
         return s
     }
     var maxLen = 1;
     var begin = 0;
     var dp = init2dArray(len,len,null);
     for(var i =0;i<len;i++){
         dp[i][i] = true
     }
     for(var j =1;j<len;j++){
         for(var i =0;i<j;i++){
             if(s[i]!=s[j]){
                dp[i][j]= false
             }else{
                if(j-i<3){
                    dp[i][j] = true
                }else{
                    dp[i][j] = dp[i+1][j-1]
                }

             }
             if(dp[i][j]&&j-i+1>maxLen){
                 maxLen = j-i+1;
                 begin = i;
             }
         }
     }
         return s.substring(begin, begin + maxLen);

 };
 longestPalindrome('aba')

