let BASE_URL = '';
let timeout= 1000;
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV == 'production'){
    BASE_URL = ''
}else if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://httpbin.org/'
  } else {
    BASE_URL = 'http://test'
  }
 export {BASE_URL,timeout} 
