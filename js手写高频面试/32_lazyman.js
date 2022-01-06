class Lazyman{
    constructor(name){
        this.tasks=[];
        const task = ()=>{
            console.log(`hi ,i an a lazy man named ${name}`);
            this.next();
        }
        this.tasks.push(task);
        setTimeout(()=>{console.log(this.tasks); this.next()},0)
    }
    next() {
        const task = this.tasks.shift(); // 取第一个任务执行
        task && task();
      }
      sleep(time) {
        this.sleepWrapper(time, false);
        return this; // 链式调用
      }
      sleepFirst(time){
          this.sleepWrapper(time,true);
          return this
      }
    sleepWrapper(time,first){
     //是否先睡觉  谁多少秒
     const task = ()=>{
         setTimeout(()=>{
           console.log('小睡一会');
           this.next();
         },time * 1000)
     }
     if(first){
         this.tasks.unshift(task)
     }else{
         this.tasks.push(task)
     }
    }  
    eat(name) {
        const task = () => {
          console.log(`Eat ${name}`);
          this.next();
        };
        this.tasks.push(task);
        return this;
      }
}
function LazyMan(name) {
    return new Lazyman(name);
  }
  LazyMan('wangming').sleep(5).eat('banana')