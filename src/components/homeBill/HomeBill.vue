<template>
	<div class="col s12 m6 l4">
		<div class="card light-blue bill-card">
			<div class="card-content">
				<span class="card-title white-text">Счет в валюте</span>

				<p v-for="currency in currencies" :key="currency" class="currency-line">
					<span class="white-text">{{ getCurrency(currency) | currencyFilter(currency) }}</span>
				</p>

			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'HomeBill',
		props: ['rates'],
		data: () => ({
			currencies: ['RUB', 'USD', 'EUR']
		}),
		computed: {
			// Сколько валюты в евро
			base () {
				return this.$store.getters.userInfo.bill * (this.rates['EUR'] / this.rates['RUB']);
			}
		},
		methods: {
			// Пересчёт в другие валюты
			getCurrency(currency) {
				return Math.floor(this.base * this.rates[currency]);
			}
		}
	}

</script>

