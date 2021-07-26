//Libraries
import Vue from 'vue';
import Vuelidate from 'vuelidate';

//Sources
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';

import dateFilter from '@/filters/date.filter';
import 'materialize-css/dist/js/materialize';

Vue.config.productionTip = false;

// =======================================================================
// Libraries
Vue.use(Vuelidate);

// Filters
Vue.filter('dateFilter', dateFilter);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app') // mount to div#app
