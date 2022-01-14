<template>
  <div style="display:flex">
  <!--   <Directives>
      <h1>1.普通插槽： 来自基础slot的test  {{content}} 一个不带 name 的 slot 出口会带有隐含的名字“default”。</h1>
      <template v-slot:hasNameSlot2='childDataTothere'><h2>具名插槽：为了测试多写一个：并且用来测试作用域插槽，为了我们可以在父组件中访问到子组件的数据而设立:子组件数据{{childDataTothere.user.name}}并且只有当前slot可访问</h2></template>
      <template v-slot:hasNameSlot><h1>2.具名插槽： hasNameSlot slot   v-slot:hasNameSlot 可以被重写为 #hasNameSlot</h1></template>
     <slot slot="hasNameSlot"><h1>插槽的第三种写法</h1></slot>
    </Directives> -->
<!-- <ComputedAndWatchVue></ComputedAndWatchVue> -->
  <!--   <ClassAndStyleVue></ClassAndStyleVue> -->
<!-- <ListRenderVue></ListRenderVue> -->
<!-- <ParentCommunicateWithchild :content2='content' ref='child' @exeHandler = 'selfMethod'></ParentCommunicateWithchild> -->
<!-- <Global></Global> -->
<!-- <keep-alive>
<LifeCycleVue v-if='isDestory'></LifeCycleVue>
</keep-alive>
<button @click="isDestory=!isDestory">卸载组件</button> -->
<!-- <formCheckboxVue></formCheckboxVue> -->
<!-- <NextTickVue></NextTickVue> -->
<!-- <AsyncLoadComponentVue></AsyncLoadComponentVue> -->
 <!--  <el-button type="primary">主要按钮</el-button> -->
<!--  <SlotApi>
 <template v-slot:prepend>前面</template>
 <template v-slot:append>后面</template>
 </SlotApi> -->
 <!-- <WxFriends></WxFriends> -->
 <van-field v-model="text" label="文本" />
  <router-view/>
  </div>
</template>

<script>
import Directives from './components/Directives.vue'
import ComputedAndWatchVue from './components/ComputedAndWatch.vue'
import ClassAndStyleVue from './components/ClassAndStyle.vue'
import ListRenderVue from './components/ListRender.vue'
import ParentCommunicateWithchild from './components/ParentCommunicateWithchild.vue'
import LifeCycleVue from './components/LifeCycle'
import formCheckboxVue from './components/formCheckbox.vue'
import NextTickVue from './components/NextTick.vue'
import MVVM from './components/MVVM.vue'
import SlotApi from './components/$slotsApiTest.vue'
import WxFriends from './components/WxFriends.vue'
export default {
  name: 'App',
  data(){
    return{
     content:'from App',
     isDestory:true,
     name:'./assets/avtar.jpg',
     text:'z'
    }
  },
/* errorCaptured(err,vm,info){
  console.log(err,vm,info);
  return false 
}, */

  components: {
    Directives,
    ComputedAndWatchVue,
    ClassAndStyleVue,
    ListRenderVue,
    ParentCommunicateWithchild,
    LifeCycleVue,
    formCheckboxVue,
    NextTickVue,
    AsyncLoadComponentVue:()=>import('./components/AsyncLoadComponent.vue'),
    MVVM,
    SlotApi,
    WxFriends,
  },
  methods:{
    selfMethod(...res){
     console.log(res);
    }
  }
}
</script>

<style>

</style>
