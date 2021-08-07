<template>
	<div>
		<div class="page-title">
			<h3>Профиль</h3>
		</div>

		<form class="form" @submit.prevent="submitHandler">
			<div class="input-field">
				<input id="description"	type="text" v-model.trim="name" :class="{ invalid: emptyName }">
				<label for="description">Имя</label>
				<span	class="helper-text invalid" v-if="emptyName">Введите имя</span>
			</div>

			<div class="switch">
				<label>
					English
					<input type="checkbox">
					<span class="lever"></span>
					Русский
				</label>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import { required } from 'vuelidate/lib/validators';

	export default {
		name: 'Profile',
		data: () => ({
			name: ''
		}),
		validations: {
			name: { required }
		},
		computed: {
			...mapGetters(['userInfo']),
			emptyName () {
				return this.$v.name.$dirty && !this.$v.name.required;
			},
		},
		mounted () {
			this.name = this.userInfo.name;
			setTimeout(() => { M.updateTextFields() }, 0)
		},
		methods: {
			...mapActions(['updateUserInfo']),
			async submitHandler () {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				try {
					await this.updateUserInfo({ name: this.name });

				} catch (e) {
					throw (e);
				}
			}
		}
	}

</script>

<style lang="scss" scoped>
	.switch {
		margin-bottom: 2rem;
	}
</style>
