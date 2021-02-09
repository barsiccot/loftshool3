import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import categories from './modules/categories.js';
import tooltips from "./modules/tooltips";
export const store = new Vuex.Store({
    modules: {
        categories,
        tooltips

    }
});