import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    mode: "history",
    base: "page-web",
    routes: [
        {
            path: "/home",
            name: "home",
            component: () => import("../module/home/index.vue"),
        },
    ],
});
