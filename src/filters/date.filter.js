// examples
// | dateFilter('date time') --> 27 июля 2021 г., 20:30:49
// | dateFilter('date') --> 27 июля 2021 г.
// | dateFilter('time') --> 20:30:49

import store from '../store';

export default function dateFilter (value, format = 'date') {
	const options = {};

	if (format.includes('date')) {
		options.day = '2-digit';
		options.month = 'long';
		options.year = 'numeric';
	}

	if (format.includes('time')) {
		options.hour = '2-digit';
		options.minute = '2-digit';
		options.second = '2-digit';
	}

	const locale = store.getters.userInfo.locale || 'ru-RU';
	return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}
