<template>
    <div>
        <h1>{{userName}}</h1>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'CodeTest',
    setup() {
        let userName = ref('wangming')
        return {
            userName,
        }
    }
}
</script>

<style  scoped>

</style>