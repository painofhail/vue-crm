<template>
	<div>
		<Loader v-if="loading" />

		<div v-else class="layout-main">
			<Header @clickBurger="showMenu = !showMenu" />
			<Sidebar :show="showMenu" />

			<main class="layout-main__content" :class="{'layout-main__content--full' : !showMenu}">
				<div class="layout-main__wrapper">
					<router-view />
				</div>
			</main>

			<router-link class="action-button" to="/record" v-tooltip="'Создать новую запись'"><span>+</span></router-link>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/header/Header';
	import Sidebar from '@/components/sidebar/Sidebar';

	export default {
		name: 'MainLayout',
		data: () => ({
			showMenu: true,
			loading: true
		}),
		components: {
			Header,
			Sidebar
		},
		async mounted () {
			if (!Object.keys(this.$store.getters.userInfo).length) {
				await this.$store.dispatch('fetchUserInfo');
			}

			this.loading = false;
		}
	}
</script>
