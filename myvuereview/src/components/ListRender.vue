<template>
  <div>
      <!-- <h1  v-show="item.isShow" v-for="item in arrList" :key="item.id" >{{item.content}}</h1> -->
      <h1>v-if和v-for放在同一元素上 v-for 优先级更高，这样可以根据数据某一项的具体值确定本条数据是否渲染，不推荐这样做
      (关闭Vetur的eslint方可运行)
      </h1>
  </div>
</template>

<script>
export default {
  data(){
      return {
          arrList:[
              {id:'a',content:'AAAAA',isShow:true},
              {id:'b',content:'BBBBBB',isShow:true},
              {id:'c',content:'CCCCC',isShow:false}
          ]
      }
  }
}
</script>

<style>

</style>