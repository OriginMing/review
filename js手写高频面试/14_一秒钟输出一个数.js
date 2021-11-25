/* for(let i=0;i<=10;i++){   //用var打印的都是11
    setTimeout(()=>{
       console.log(i);
    },1000*i)
} */

/* for(var i = 1; i <= 10; i++){
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 1000 * i)
    })(i);
}
 */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
console.log($.ajax,$.ajaxSend) //查看jquery是否能够执行

function getData(url){
    return new Promise((resolve,reject)=>{
      $.ajaxSend({
          url,
          success(data){
              resolve(data)
          },
          error(err) {
            reject(err)
          }
      })
    })
}
getData('xx').then(()=>{

})


