<template>
  <div>
      <el-input>
       <!--    <template v-for="(_,slotName) in $slots" v-slot:[slotName]>
            <slot :name="slotName"></slot>
          </template> -->
         <!--  <slot v-for="(_,slotName) in $scopedSlots" :name='slotName' :slot="slotName"></slot> -->  <!-- ：name生命插槽 ：slot使用插槽 -->
       <!--          <template v-for="(_,slotName) in $scopedSlots" v-slot:[slotName]='childDataTothere'>
            <slot :name="slotName" v-bind="childDataTothere"></slot>
          </template> -->
      </el-input>
  </div>
</template>

<script>
export default {
 mounted(){
     console.log(this.$slots);
 }
}
</script>

<style>

</style>