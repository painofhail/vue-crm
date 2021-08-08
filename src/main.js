// ======================= Libraries ==========================
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import 'materialize-css/dist/js/materialize';

Vue.use(Vuelidate);

// ======================= Sources ============================
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';

// ================== Third party components =======================
import Paginate from 'vuejs-paginate'

Vue.component('Paginate', Paginate)

// ================== Custom Components =======================
import loader from '@/components/App/loader/Loader';

Vue.component('Loader', loader);

// ======================= Plugins ============================
import messagePlugin from '@/utils/message.plugin';

Vue.use(messagePlugin);

// ======================= Directives ============================
import tooltipDirective from '@/directives/tooltip.directive';

Vue.directive('tooltip', tooltipDirective);

// ======================= Firebase ===========================
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
	apiKey: "AIzaSyDpkRsAsaxVtcSxk2zHs18A8eYoHiNHdlA",
	authDomain: "vue-crm-painofhail.firebaseapp.com",
	projectId: "vue-crm-painofhail",
	storageBucket: "vue-crm-painofhail.appspot.com",
	messagingSenderId: "105694092505",
	appId: "1:105694092505:web:102686cea8f68cda6132c8",
	measurementId: "G-TD59ZRXM16"
});

let app;

// If firebase find local user data, initialize Vue App
firebase.auth().onAuthStateChanged(() => {
	// check if already initizlized
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app') // mount to div#app
	}
});

// ======================= Filters ============================
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';

Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('localizeFilter', localizeFilter);
// ============================================================

Vue.config.productionTip = false;
