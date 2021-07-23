<template>
	<div id="app">
		<component :is="layout">
			<router-view/>  <!-- Vue рендерит сюда все страницы, которые загружаются по роуту -->
		</component>
	</div>
</template>

<script>

	import Auth from '@/layouts/AuthLayout';
	import Main from '@/layouts/MainLayout';

	export default {
		components: {
			Auth,
			Main
		},
		computed: {
			layout () {
				console.log(this.$route.meta);
				return 'auth-lauout';
			}
		},
	}

</script>

<style lang="scss">
	@import '~materialize-css/dist/css/materialize.min.css';
	@import '../dist/styles/style.min.css';
	// @import '@/styles/main.scss';
</style>
