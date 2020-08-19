<template>
    <div class="home">
        vue + vuex + vue-router + axios + moment + mock + echarts
        <br>
        my name is <span>{{name}}</span>
    </div>
</template>
<script>
import { get } from 'utils/http';

export default {
    name: 'home',
    data() {
        return {
            name: '',
        };
    },
    mounted() {
        this.getName();
    },
    methods: {
       getName() {
           get('getName').then(res => {
               this.name = res.data;
           });
       }
    },
};
</script>
<style lang="scss" scoped>
.home {
    height: 100%;
}
</style>
