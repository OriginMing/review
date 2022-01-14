<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 v-text="msg"></h1>
    <div v-html="htmlTemplate"></div><!-- 详情参见https://cn.vuejs.org/v2/api/#v-html -->
    <input type="text"  v-model.lazy="inputContent"/>
    <h1>表单双向绑定的值：{{inputContent}}</h1>
    头部
     <slot></slot>
     内容
     <slot name='hasNameSlot'></slot>
     尾部
     <slot name='hasNameSlot2' v-bind:user="user"></slot>
  <h1>v-pre</h1>
  <span v-pre>{{这里就变为正常显示不解析mustache语法}}</span>
  <h1>v-cloak</h1>
  <span v-cloak>这个指令保持在元素上直到关联实例结束编译。也就说这里的mustache为编译的话那么v-clock就会存在于该元素上，所以结合[v-clock]{display:none}，可以实现不显示暂未完成编译的mustache语法</span>
  v-once只会渲染一次，此后改变不再变化
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      msg:"hello world",
      htmlTemplate:'<a href="http://www.baidu.com">百度</a>',
      inputContent:'',
      user:{
        name:'mingming',
        sex:'man'
      }
    }
  }
}
</script>
<style scoped>

</style>
