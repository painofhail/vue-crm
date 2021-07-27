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

// ======================= Plugins ============================
import messagePlugin from '@/utils/message.plugin';

Vue.use(messagePlugin);

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

Vue.filter('dateFilter', dateFilter);
// ============================================================

Vue.config.productionTip = false;
