<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<Loader v-if="loading" />

			<div v-else class="row">
				<CategoryCreate @created="addNewCategory" />
				<CategoryEdit
					v-if="categories.length"
					:categories="categories"
					@updated="updateCategories"
					:key="categories.length + updateCount"
				/>
				<!-- key - чтобы при обновлении категории перерисовывался компонент -->

				<p v-else class="center">Пока категорий не создано</p>
			</div>
		</section>
	</div>

</template>

<script>
	import CategoryCreate from '@/components/category-create/CategoryCreate'
	import CategoryEdit from '@/components/category-edit/CategoryEdit'

	export default {
		name: 'Categories',
		metaInfo () {
			return {
				title: this.$title('Categories')
			}
		},
		components: {
			CategoryCreate,
			CategoryEdit
		},
		data: () => ({
			categories: [],
			loading: true,
			updateCount: 0
		}),
		async mounted () {
			this.categories = await this.$store.dispatch('fetchCategories');
			this.loading = false;
		},
		methods: {
			addNewCategory (cat) {
				this.categories.push(cat);
			},
			updateCategories (cat) {
				const index = this.categories.findIndex(c => c.id === cat.id);
				this.categories[index].title = cat.title;
				this.categories[index].limit = cat.limit;
				this.updateCount++;
			}
		}

	}

</script>
