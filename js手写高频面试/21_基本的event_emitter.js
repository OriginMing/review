class EE{
    constructor() {
        this.events = {};
      }
      on(name,func){
      if(!this.events[name]){
          this.events[name] = [func]
      }else{
        this.events[name].push(func);
      }
    }
    off(name,func){
        if(!this.events[name])return
        this.events[name] = this.events[name].filter((item)=>{
            return item!=func
        })
    }
    emit(name,...params){
        this.events[name]&&this.events[name].forEach((fn) => fn.apply(this, params));
    }
    /* once指只通知一次 */
    once(name,func){
        function fn() {
            func();
            this.off(name, fn);
          }
          this.on(name,fn)
    }
 
  
}

const event = new EE();
 event.once("dbClick", () => {console.log(123456); });
 event.emit("dbClick");
 event.emit("dbClick");