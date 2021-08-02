<template>
	<div class="col s12 m6 l8">
		<div class="card orange darken-3 bill-card">
			<div class="card-content">
				<div class="card-header">
					<span class="card-title white-text">Курс валют</span>
				</div>

				<table class="white-text">
					<thead>
						<tr>
							<th>Валюта</th>
							<th>Курс</th>
							<th>Дата</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="currency in currencies" :key="currency">
							<td>{{ currency }}</td>
							<td>{{ rates[currency] }}</td>
							<td>{{ date | dateFilter('date') }}</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'HomeCurrency',
		props: ['rates', 'date'],
		data: () => ({
			currencies: ['RUB', 'USD', 'EUR']
		})
	}

</script>
