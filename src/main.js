//Libraries
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import 'materialize-css/dist/js/materialize';

//Sources
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';

// Plugins
import messagePlugin from '@/utils/message.plugin';

import dateFilter from '@/filters/date.filter';

Vue.config.productionTip = false;

// =======================================================================
// Libraries
Vue.use(Vuelidate);

// Plugins
Vue.use(messagePlugin);

// Filters
Vue.filter('dateFilter', dateFilter);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app') // mount to div#app
