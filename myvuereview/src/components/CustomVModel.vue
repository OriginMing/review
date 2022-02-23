<template>
  <div>
      <input 
           type="checkbox"
            v-bind:checked="checked"
       @input="$emit('change',$event.target.checked)"
      >
  </div>
</template>

<script>
export default {
  model:{
    prop:'checked',
    event:'change' 
  },
  // 默认情况下，V-model会把input  的value用做props,吧input时间用作event，我们自定义的组件没有value 和input事件，所以通过model选项
  //声明prop和 event对应的 变量和事件
  props:{
      checked:{
      type: Boolean,
      }
  }
}
</script>

<style>

</style>