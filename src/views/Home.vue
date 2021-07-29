<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>
			<button class="btn btn-small waves-effect waves-light" @click="refresh">
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="loading" />

		<div v-else class="row">
			<HomeBill :rates="currency.rates" />
			<HomeCurrency :rates="currency.rates" :date="currency.date" />
		</div>

	</div>
</template>

<script>

	import HomeBill from '@/components/homeBill/HomeBill';
	import HomeCurrency from '@/components/homeCurrency/HomeCurrency';

	export default {
		name: 'Home',
		data: () => ({
			loading: true,
			currency: null
		}),
		components: {
			HomeBill,
			HomeCurrency
		},
		async mounted () {
			await this.waitForCurrency();
		},
		methods: {
			async refresh () {
				this.loading = true;
				await this.waitForCurrency();
			},
			async waitForCurrency () {
				this.currency = await this.$store.dispatch('fetchCurrency');
				this.loading = false;
			}
		}
	}

</script>
