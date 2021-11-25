((WebSocket,doc,localStorage)=>{
    let inputEle = doc.getElementById('message')
    let buttonEle = doc.getElementById('sendMessage')
    let listEle = doc.getElementById('list')
    let ws = new WebSocket('ws:localhost:8000')
    let inputValue = ''
    inputEle.addEventListener('input',changeInputValue);
    buttonEle.addEventListener('click',handleSendMessage)
    ws.addEventListener('open',handleOpen);
    ws.addEventListener('close',handleClose);
    ws.addEventListener('message',handleMessage);
    ws.addEventListener('error',handleError);
    function changeInputValue(data){
       inputValue = data.srcElement.value;
    }
    function handleSendMessage(){
    ws.send(JSON.stringify({username:localStorage.getItem('username'),Text:inputValue}))
     console.log('消息发送成功');
    }
    function handleOpen(){
    console.log('已连接上服务器');
    }
   async function handleMessage(e){
     console.log(e.data);
      var text = JSON.parse((await (new Response(e.data)).text()));
      let li = document.createElement('li')
      li.innerHTML = `姓名：${text.username}:消息：${text.Text}`
      listEle.appendChild(li)
    }
    function handleError(){

    }
    function handleClose(){
    
    }
})(WebSocket,document,localStorage);