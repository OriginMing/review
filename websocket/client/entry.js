((doc,localStorage,window)=>{
let inputValue = doc.getElementById('username');
let buttonTo = doc.getElementById('goroom');
let valueInput = ''
function init(){
    bindEvent();
}
function bindEvent(){
    buttonTo.addEventListener('click',handleButton);
    inputValue.addEventListener('input',handleInput)
}
function handleInput(data){
    valueInput =  data.srcElement.value
}
function handleButton(){
    localStorage.setItem('username',valueInput);
    window.location.href='index2.html'
}
init()
})(document,localStorage,window);
