<template>
  <div>
    <div style="width:50px;height:50px;border:1px solid red" class="hahaha"  :class="{'active':isActive}">
    </div>
    <h1>{key:value},value值为true时key将被应用为类名 :class 和 class的内容将被合并而非替代</h1>
    <h1>"[isActive ? activeClass : '', errorClass,{ active: isActive }]" 数组形式可以写三元运算符也可嵌套对象</h1>
  </div>
</template>

<script>
export default {
  data(){
      return{
          isActive:true
      }
  }
 
}
</script>

<style scoped>

</style>