import Vue from 'vue';
import Vuex from 'vuex';
import works from './modules/works.js';
import reviews from './modules/reviews.js';
import user from './modules/user.js'
import categories from './modules/categories.js';
import tooltips from "./modules/tooltips";
Vue.use(Vuex);


export const store = new Vuex.Store({
    modules: {
        categories,
        tooltips,
        works,
        reviews,
        user

    }
});