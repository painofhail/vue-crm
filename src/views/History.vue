<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<div class="history-chart">
			<canvas ref="canvas"></canvas>
		</div>

		<Loader v-if="loading" />

		<p v-else-if="!records.length" class="center">Записей пока нет.
			<router-link to="/record">Сделать новую запись</router-link>
		</p>

		<section v-else>
			<HistoryTable :records="items" />

			<Paginate v-if="pageCount > 1"
				v-model="page"
				:page-count="pageCount"
				:click-handler="pageChangeHandler"
				:prev-text="'Назад'"
				:next-text="'Вперёд'"
				:container-class="'pagination'"
				:page-class="'waves-effect'"
			/>
		</section>
	</div>
</template>

<script>
	import HistoryTable from '@/components/history-table/HistoryTable';
	import paginationMixin from '@/mixins/pagination.mixin';
	import { Pie } from 'vue-chartjs';

	export default {
		name: 'History',
		metaInfo () {
			return {
				title: this.$title('History')
			}
		},
		components: {	HistoryTable },
		mixins: [ paginationMixin, Pie ],
		data: () => ({
			loading: true,
			records: []
		}),
		async mounted () {
			this.records = await this.$store.dispatch('fetchRecords');
			const categories = await this.$store.dispatch('fetchCategories');

			this.setup(categories);

			this.loading = false;
		},
		methods: {
			setup (items) {
				this.setupPagination(this.records.map(record => {
					return {
						...record,
						categoryName: items.find(cat => cat.id === record.categoryId).title,
						typeClass: record.type === 'income' ? 'green' : 'red',
						typeText: record.type === 'income' ? 'доход' : 'расход'
					}
				}));

				this.renderChart({
					labels: items.map(cat => cat.title),
					datasets: [{
						label: 'Расходы по категориям',
						data: items.map(cat => {
							return this.records.reduce((total, record) => {
								if (record.categoryId === cat.id && record.type === 'outcome') {
									total += +record.amount;
								}
								return total;
							}, 0)
						}),
						backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				});
			}
		}
	}
</script>
