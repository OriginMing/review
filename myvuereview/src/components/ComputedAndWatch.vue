<template>
  <div>
      <h1>firstName{{firstName}}</h1>
      <h2>lastName：{{lastName}}</h2>
      <h3 >fullName{{fullName}}</h3>
      <h2>计算属性的set当给计算属性赋值时 set函数将触发并将接收到赋值的新变量||计算属性是基于它们的响应式依赖进行缓存的</h2>
      <button @click="exeChangeName">changefullname</button>


      <h1>part2:watch</h1>
      <span >。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。</span>
          <button @click="exeChangeTestWatch">ChangeTestWatch</button>
          <h2>watch监听引用类型拿不到oldvalue,若要拿只能通过监听引用属性的某一具体项</h2>


        <h1>无论是watch or computed，使用箭头函数将无法用this访问vue的实例，这是因为箭头函数绑定了父级作用域的上下文</h1>  
  </div>
</template>

<script>

export default {
 data(){
   return{
          firstName: 'Foo',
          lastName: 'Bar',
          testWatch:{'a':'你好'}
   }
 } , 
 computed:{
   fullName:{
       get: function () {
      return this.firstName + ' ' + this.lastName
        },
        set: function (newValue) {
      let names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
   }
 },
 methods:{
     exeChangeName(){
         this.fullName = 'John Doe' +Math.random()
     },
     exeChangeTestWatch(){
          this.testWatch.a='你好呀'
     }
 },
 watch:{
     testWatch:{
         handler:function(newVlue,oldVlue){
             console.log(this);
             console.log(newVlue,oldVlue);
         },
         immediate: true,
     },
     'testWatch.a':{
            handler:(newVlue,oldVlue)=>{
             console.log('-----------');
             console.log(newVlue,oldVlue);
         },
     }
 }

}
</script>

<style>

</style>