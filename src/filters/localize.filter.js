// examples (check "locales" folder)
// Профиль | localizeFilter --> Profile

import store from '../store';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const locales = {
	'ru-RU': ru,
	'en-US': en
};

export default function localizeFilter(key) {
	const locale = store.getters.userInfo.locale || 'ru-RU';
	return locales[locale][key] || `[Localize error]: key ${key} not found`;
}