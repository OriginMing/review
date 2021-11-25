const Ws = require('ws')
const server = new Ws.Server({port: 8000}) //、

function bindEvent(){
    server.on('close',handleClose)
    server.on('connection',handleConnection)
}
function handleClose(){

}
function handleConnection(ws){
    console.log('连接');
  ws.on('message',handleMessage)
}
function handleMessage(msg){
 console.log(JSON.parse(msg));
 server.clients.forEach(c=>{
     c.send(msg)
 })
}
bindEvent()