function debounce(func,duration){
    var timer;
    return function(){
        clearTimeout(timer)
        timer =  setTimeout(() => {
            func()
        }, duration);
    }  
}

