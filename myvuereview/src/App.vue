<template>
  <div style="">
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
 <!-- <SlotApi> -->
 <!-- <template v-slot:prepend>前面</template>
 <template v-slot:append>后面</template> -->
 <!-- <slot slot='prepend'>前面</slot>
 <slot slot='append'>后面</slot> -->
 <!-- </SlotApi> -->
 <!-- <WxFriends></WxFriends> -->
 <!-- <van-field v-model="text" label="文本" /> -->
 <!-- <Custom
 title="测试弹窗"
  :visible.sync="visibleDialog"
  @confirm="_handleConfirm" @cancel="_handleCancel"
>
     <h1>hahaah</h1>
 </Custom> -->

 <!-- <Sync :content.sync ='title'></Sync> -->
 <!-- {{title}} -->
   
 <!-- <div @click.prevent="requestSend()">测试axios封装</div>
 <input type="text" v-test.bar='1+1'>
 <button v-throttle='{time:5000,func:requestSend}'>测试</button>
 <div> <img v-lazyimg="require('@/img/o.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o1.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o2.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o3.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o4.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o5.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o6.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o7.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o8.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o9.jfif')" alt="">
</div>
<div> <img v-lazyimg="require('@/img/o10.jfif')" alt="">
</div> -->
  <button v-copy="copyText">copy</button>
  <input type="text" v-model="copyText"> {{copyText}}
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
import Custom from './components/二次封装elementButton.vue'
import Sync from '@/components/Sync.vue'
import wmReuest from './service/index.js'
export default {
  name: 'App',
  data(){
    return{
     content:'from App',
     isDestory:true,
     name:'./assets/avtar.jpg',
     text:'z',
     visibleDialog:true,
     title:'',
     copyText:"要拷贝的东西"
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
    Custom,
    Sync
  },
   mounted() {
     let a = require.context('./components/', true,/\.js$/).keys();
   },
   
  methods:{
    selfMethod(...res){
     console.log(res);
    },
    _handleConfirm(){
      console.log("确认");
      this.visibleDialog=false
    },
    _handleCancel(){
      console.log("取消");
      this.visibleDialog = false
    },
    requestSend(){
      //如果使用的qs进行序列化,那么content-type就是application/x-www-form-urlencoded,也就是常说的表单提交传输的样式是formdata
      // 否则就是 默认的 payload request   Content-Type: application/json
      wmReuest.request({
        method:'get',
        url:'/get',
        params:{xx:"xxx"},
        showLoading:false

      }).then(res=>{
        console.log(res);
      });
      // wmReuest.request({
      //   method:'post',
      //   url:'/post',
      //   data:{xxx:'xx'}
      // }).then(res=>{
      //   console.log(res);
      // })
    }
  }
}
</script>

<style>
 img{
   height: 100px;
 }
</style>
