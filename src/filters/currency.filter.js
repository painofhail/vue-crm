// examples
// | currencyFilter('RUB') --> ₽
// | currencyFilter('EUR') --> €
// | currencyFilter('USD') --> $

export default function currencyFilter (value, currency = 'RUB') {
	return Intl.NumberFormat('ru-RU', { style: 'currency', currency: currency }).format(value);
}
