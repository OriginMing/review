<template>
<div>
  <div ref="text">
      <h1 v-for="item in list" :key="item">{{item}}</h1>
  </div>
      <button @click='addItem'>添加</button>
      <button @click="jump">跳转传参</button>
      </div>
</template>

<script>

export default {
name:'Test',
data(){
    return{
        list:['a','b','c']
    }
},
beforeRouteEnter(to,from,next){
  console.log(this);  
  next()
},
created(){
console.log('created');
},
methods:{
    addItem(){
        this.list.push(`${Date.now()}`)
        this.list.push(`${Date.now()}2`)
        this.list.push(`${Date.now()}3`)
        this.$nextTick(()=>{
        console.log( this.$refs.text.childNodes);
        })
    },
    jump(){
        let pp = 2
         this.$router.push({path:'/MINE',query:{user:'mingming'}})
      // this.$router.push({ name: 'Mine', params: {user:'mingming' }}) // -> /user
             // this.$router.push({ name: 'Mine', query: {user:'mingming' }}) // -> /user
             //如果提供了 path，params 会被忽略
           //  this.$router.push({path:`/mine/${pp}`})
      // this.$router.push({name:'Mine',})
    }

}
}
</script>

<style>

</style>