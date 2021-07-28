<template>
	<div class="layout-empty">
		<router-view />
	</div>
</template>

<script>
	import messages from '@/utils/messages';

	export default {
		name: 'EmptyLayout',
		computed: {
			error () {
				return this.$store.getters.error;
			}
		},
		watch: {
			error (firebaseError) {
				this.$error(messages[firebaseError.code] || 'Что-то пошло не так...');
			}
		}
	}

</script>
