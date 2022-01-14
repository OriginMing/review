<template>
  <div>
<ul>
  <li v-for="(item, index) in imgList" :key=index  >
        <img :src="item" style="height:100%;width:100%">
    </li>
</ul>

  </div>
</template>

<script>
export default {
  created(){
    //console.log(this.$route);
   // console.log(this.$route.query);// path:query的方式
   //name:params方式 console.log(this.$route.params);
   //console.log(this.$route.params);
  },
    data(){
        return{
          // imgList:[require( '../assets/avtar.jpg')]
           //imgList:[require( '../assets/avtar.jpg'),require('../assets/logo.png')]
          imgList:[require( '../assets/avtar.jpg'),require('../assets/logo.png'),require( '../assets/avtar.jpg')]
           //imgList:[require( '../assets/avtar.jpg'),require('../assets/logo.png'),require( '../assets/avtar.jpg'),require('../assets/logo.png'),]
        }   
    }
}
</script>

<style  scoped>

ul{
   display: flex;
 justify-content: flex-start;
 flex-wrap: wrap;
 list-style: none;
 padding: 0;
 margin: 0;
 width: 400px;
 height: 200px;

}
/* 一张图片 */
 li:last-child:first-child{
 width: 400px;
 height: 200px;
 margin: 0;
}
/* 两张图片 */
li:nth-last-child(2):first-child{
 width: 49%;
 height: 200px;
  margin-right: 2%;
}
li:nth-last-child(1):nth-child(2){
 width: 49%;
 height: 200px;
}
/* 三张图片 */
li:nth-last-child(3):first-child{
 width: 49%;
 height: 200px;
}
li:nth-child(3):last-child{
    width: 49%;
    height: 100px;
}
li:nth-child(2):nth-last-child(2){
    width: 49%;
    height: 100px;
}
/* 4张图片的情况 */
li:nth-last-child(4):first-child,li:nth-last-child(2):nth-child(3){
 width: 49%;
 margin-right: 2%;
 height: 100px;
}
li:nth-last-child(3):nth-child(2),li:nth-last-child(1):nth-child(4){
 width: 49%;
 height: 100px;
}
/* ul li:nth-last-child(4):first-child~li{
  width:32%;margin-right:2%
}
ul li:nth-last-child(4):first-child ~ li:nth-child(2n){
 width:32%;
} */
</style>>
