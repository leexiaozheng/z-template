import Vue from "vue";
import Vuex from "vuex";
import actions from "./action";
import getters from "./getters";
import state from "./state";
import mutations from "./mutations";

Vue.use(Vuex);
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
});
