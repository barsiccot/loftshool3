import "babel-polyfill";
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';

import router from './router';
import $axios from './requests';
import {store} from './store/index.js';

store.$axios = $axios;

Vue.prototype.$axios = $axios;

Vue.use(Vuelidate);

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});