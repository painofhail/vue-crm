<template>
	<div class="layout-main">
		<Header @toggleMenu="showMenu = !showMenu" />
		<Sidebar :show="showMenu" />

		<main class="layout-main__content" :class="{'layout-main__content--full' : !showMenu}">
			<div class="layout-main__wrapper">
				<router-view />
			</div>
		</main>

		<router-link class="action-button" to="/record"><span>+</span></router-link>
	</div>
</template>

<script>
	import Header from '@/components/header/Header';
	import Sidebar from '@/components/sidebar/Sidebar';

	export default {
		name: 'main-layout',
		data: () => ({
			showMenu: true,
		}),
		components: {
			Header,
			Sidebar
		}
	}
</script>
