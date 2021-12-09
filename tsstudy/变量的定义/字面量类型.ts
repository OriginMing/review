let info = {
    method:'get'
} as const;
type Method = 'get'|'post' 
function request(method:Method){
    
}
request('get');
request(info.method )
request(info.method as Method)
export {}