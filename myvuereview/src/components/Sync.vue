<template>
    <div>
        <input type="text" @input="hxhx($event)" ref="input">
    </div>
</template>

<script>
export default {
    name: 'ReviewSync',
    data() {
        return {
            value: '',
        };
    },
    methods:{
        hxhx(e){
            console.log(e);
            this.$emit('update:content', this.$refs.input.value)
        }
    }
};
</script>

<style >

</style>