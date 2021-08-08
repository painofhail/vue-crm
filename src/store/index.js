import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import userInfo from './userInfo';
import category from './category';
import record from './record';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		error: null
	},
	mutations: {
		setError (state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null
		}
	},
	actions: {
		async fetchCurrency () {
			const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
			const resJSON = await res.json();
			const currency = {
				date: resJSON.Date.slice(0, 10),
				rates: {
					USD: resJSON.Valute.USD.Value,
					EUR: resJSON.Valute.EUR.Value,
					RUB: 1
				}
			}
			return currency;
		}
	},
	getters: {
		error: s => s.error
	},
	modules: {
		auth,
		userInfo,
		category,
		record
	}
});
