import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import Toast from 'vue-toastification';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Toast, {
  duration: 3000,
  hideProgressBar: true,
});
new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
