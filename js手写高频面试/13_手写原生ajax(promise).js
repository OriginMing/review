var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function ajax(url){
    return new Promise((resolve,reject)=>{
       let xhr = new XMLHttpRequest()
       xhr.open('get', url)
       xhr.onreadystatechange=()=>{
        if(xhr.readyState===4){
            if(xhr.status>=200&&xhr<300){
                resolve(JSON.parse(xhr.responseText))
            }else{
                reject('请求出错')
            }
        }
       }
       xhr.send()
    })
}
let url = 'https://www.baidu.com'
ajax(url).then(res => console.log(res))
  .catch(reason => console.log(reason))