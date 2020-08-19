import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import { resize } from 'utils/handle.js';

import 'theme/base.scss';

Vue.directive('resize', resize);// 添加v-resize指令，监听元素大小变化

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    render(h) {
        return h('app');
    },
});
