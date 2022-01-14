<template>
  <div>
      <input type="text" 
       value="name2"
       @input="$emit('change',$event.target.value)"
      >
  </div>
</template>

<script>
export default {
  model:{
    prop:'name2',
    event:'change' 
  },
  props:{
      name2:{
          default:'',
      }
  }
}
</script>

<style>

</style>