<template>
  <div>
      <h1>{{muui}}</h1>
    <CustomVModelVue v-model="muui" ></CustomVModelVue>
  </div>
</template>
  
<script>
// :name2='muui' @change='(fromChild)=>muui=fromChild'
import CustomVModelVue from "./CustomVModel.vue"
export default {
  data(){
      return{
          muui:''
      }
  },
  components:{
      CustomVModelVue,
  }
}
</script>

<style>

</style>