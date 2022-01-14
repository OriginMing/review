<template>
  <div></div>
</template>

<script>
import event from './brother'
export default {
  methods:{
    handler(...res){
    console.log(...res);
    }
  },
 beforeCreate(){console.log('beforeCreate');},
  created(){console.log('created');
    event.$on('send-to-brother',this.handler)
  },
  beforeMount(){console.log('beforeMount');},
  mounted(){console.log('mounted');},
  beforeUpdate(){console.log('beforeUpdate');},
  update(){console.log('updata');},
  beforeDestroy(){console.log('beforeDestroy');},
  destroyed(){
    event.$off('send-to-brother',this.handler)
    console.log('destroyed');
    },
  activated(){console.log('activated');},
  deactivated(){console.log('deactivated');},
}
</script>

<style>

</style>