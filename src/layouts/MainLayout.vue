<template>
	<div class="app-main-layout">

		<Header @toggleSidebar="isOpen = !isOpen" />

		<Sidebar v-model="isOpen"/>

		<!--<main class="app-content" :class="{full : !isOpen}">
			<div class="app-page">
				<router-view />
			</div>
		</main>

		<div class="fixed-action-btn">
			<a class="btn-floating btn-large blue" href="#">
				<i class="large material-icons">add</i>
			</a>
		</div> -->
	</div>
</template>

<script>
	import Header from '@/components/header/Header';
	import Sidebar from '@/components/sidebar/Sidebar';

	export default {
		name: 'main-layout',
		data: () => ({
			isOpen: true,
		}),
		components: {
			Header,
			Sidebar
		}
	}
</script>
