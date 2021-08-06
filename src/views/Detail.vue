<template>
	<div>
		<Loader v-if="loading" />

		<div v-else-if="record">
			<div class="breadcrumb-wrap">
				<router-link to="/history" class="breadcrumb">История</router-link>
				<a @click.prevent class="breadcrumb">{{ recordType }}</a>
			</div>
			<div class="row">
				<div class="col s12 m6">
					<div class="card" :class="recordColor">
						<div class="card-content white-text">
							<p>Описание: {{ record.description }}</p>
							<p>Сумма: {{ record.amount | currencyFilter() }}</p>
							<p>Категория: {{ record.categoryName }}</p>
							<small>{{ record.date | dateFilter('datetime') }}</small>
						</div>
					</div>
				</div>
			</div>
		</div>

		<p v-else class="center"><strong>Запись с id = {{ recordId}} не найдена</strong></p>
	</div>
</template>

<script>
	export default {
		name: 'Detail',
		data: () => ({
			loading: true,
			record: null
		}),
		computed: {
			recordId () {
				return this.$route.params.id
			},
			recordType () {
				return this.record.type === 'income' ? 'Доход' : 'Расход'
			},
			recordColor () {
				return this.record.type === 'income' ? 'green' : 'red'
			}
		},
		async mounted () {
			const record = await this.$store.dispatch('fetchRecordById', this.recordId)
			const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

			this.record = {
				...record,
				categoryName: category.title
			}

			this.loading = false;
		}
	}
</script>
