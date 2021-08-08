<template>
	<div>
		<div class="page-title">
			<h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
		</div>

		<form class="form" @submit.prevent="submitHandler">
			<div class="input-field">
				<input id="description"	type="text" v-model.trim="name" :class="{ invalid: emptyName }">
				<label for="description">{{ 'Name' | localizeFilter }}</label>
				<span	class="helper-text invalid" v-if="emptyName">{{ 'EnterName' | localizeFilter }}</span>
			</div>

			<div class="switch">
				<label>
					English
					<input type="checkbox" v-model="isRuLocale">
					<span class="lever"></span>
					{{ 'Russian' | localizeFilter }}
				</label>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				{{ 'Update' | localizeFilter }}
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
			name: '',
			isRuLocale: true
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
			this.isRuLocale = (this.userInfo.locale === 'ru-RU');
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
					await this.updateUserInfo({
						name: this.name,
						locale: this.isRuLocale ? 'ru-RU' : 'en-US'
					});

					this.$message('Пока переведена только страница профиля');

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
