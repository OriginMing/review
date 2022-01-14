import VueRouter from 'vue-router'
import Vue from 'vue'
import WxFriends from '../components/WxFriends.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/Mine',
        //  path: '/Mine/:id',
        name: 'Mine',
        component: WxFriends
    },
    {
        path:'/test',
        name:'Test',
        component:()=>import('../components/NextTick.vue')
    }
]
const router = new VueRouter({
    routes
});
export default router