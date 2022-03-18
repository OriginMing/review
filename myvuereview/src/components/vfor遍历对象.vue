<template>
    <div>
        <h2 v-for="(item,index) in obj" :key=index>{{index}}</h2>
    </div>
</template>

<script>
export default {
    name: 'ReviewVfor',

    data() {
        return {
            obj:{username:"wangming",userage:"18",userFriend:["xiaohong","xiaozhang","xiaoli"]}
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>