<template>
  <div>
<h1>ParentCommunicateWithchild 1.父传子 父组件所在的子组件上:xxx='aa'  子组件props接受：{xxx:{default:''}}
 2.父组件所在的子组件上 ref='xxx' 父组件上的方法 this.$refs.子组件上的方法(传参)
 3. 父组件所在的子组件上 绑定自定义事件 @xxx='parentMethod' 子组件中发射事件并传参  this.$emit('xxx','wmm','18')
 4.父组件的this.$children拿到所有子组件 同 2.的做法
 5.直接绑在原型上
</h1>
<h2>show来自父组件的内容：{{content2}}</h2>
  </div>
</template>

<script>
import Vue from "vue";
import event from './brother'
export default {
  data(){
    return {
      content:'from person'
    }
  },
  props:{
    content2:{
      default:'',
    }
  },
 
  mounted(){
   this.$emit('exeHandler','wmm','18')
   Vue.prototype.$bus = 'sssss',
   event.$emit('send-to-brother',this.content)
  },
  methods:{
    getValueFromParent(value){
       console.log(value);
    }
  }
}
</script>

<style>

</style>