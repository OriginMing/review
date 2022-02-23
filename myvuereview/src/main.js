import Vue from 'vue'
import App from './App.vue'
import Global  from './components/RegisterGlobalComponents.vue'
import MyPlugin from './components/CustomV.js'
import { Button,Input,Dialog,Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import LazyLoad from './components/V-mydirective'
import router from './router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(MyPlugin,require("!url-loader?limit=1!@/img/loading-gif-png-5.gif"))
Vue.component('Global',Global)
Vue.use(Button)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Dialog)

Vue.use(LazyLoad,'./assets/logo.png')
Vue.directive('mymodel',{
  bind(el){
  },
  inserted(){

  },
  update(){

  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
