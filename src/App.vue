<template>
	<div id="app">
		<component :is="layout">
			<router-view /> <!-- Vue рендерит сюда все страницы, которые загружаются по роуту -->
		</component>
	</div>
</template>

<script>

	import EmptyLayout from '@/layouts/EmptyLayout';
	import MainLayout from '@/layouts/MainLayout';

	export default {
		components: {
			EmptyLayout,
			MainLayout
		},
		computed: {
			layout () {
				return (this.$route.meta.layout || 'empty') + '-layout';
			}
		},
	}

</script>

<style lang="scss">
	@import '~materialize-css/dist/css/materialize.min.css';
	@import '../dist/styles/style.min.css';
	// @import '@/styles/main.scss';
</style>
