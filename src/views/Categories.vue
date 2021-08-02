<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<div class="row">
				<CategoryCreate @created="addNewCategory" />
				<CategoryEdit />
			</div>
		</section>
	</div>

</template>

<script>
	import CategoryCreate from '@/components/category-create/CategoryCreate'
	import CategoryEdit from '@/components/category-edit/CategoryEdit'

	export default {
		name: 'Categories',
		components: {
			CategoryCreate,
			CategoryEdit
		},
		data: () => ({
			categories: []
		}),
		methods: {
			addNewCategory (cat) {
				this.categories.push(cat);
				console.log(this.categories)
			}
		}

	}

</script>
