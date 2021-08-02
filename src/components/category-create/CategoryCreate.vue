<template>
	<div class="col s12 m6">
		<div>
			<h4 class="page-subtitle">Создать</h4>

			<form @submit.prevent="submitHandler">
				<div class="input-field">
					<input id="name" type="text" v-model.trim="title" :class="{ invalid: emptyTitle }">
					<label for="name">Название</label>
					<span class="helper-text invalid" v-if="emptyTitle">Введите название категории</span>
				</div>

				<div class="input-field">
					<input id="limit" type="number" v-model.number="limit" :class="{ invalid: minValue }">
					<label for="limit">Лимит</label>
					<span class="helper-text invalid" v-if="minValue">Минимальное значение: {{ requiredMinValue }}</span>
				</div>

				<button class="btn waves-effect waves-light" type="submit">Создать</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, minValue } from 'vuelidate/lib/validators';

	export default {
		name: 'CategoryCreate',
		data: () => ({
			title: '',
			limit: 1
		}),
		validations: {
			title: { required },
			limit: { minValue: minValue(1) }
		},
		computed: {
			emptyTitle () {
				return this.$v.title.$dirty && !this.$v.title.required;
			},
			minValue () {
				return this.$v.limit.$dirty && !this.$v.limit.minValue;
			},
			requiredMinValue () {
				return this.$v.limit.$params.minValue.min;
			}
		},
		mounted () {
			M.updateTextFields();	// что бы materialize зачёл начальное значение инпутов
		},
		methods: {
			async submitHandler () {
				if (this.$v.$invalid) {
					this.$v.$touch()
					return;
				}

				try {
					const newCategory = await this.$store.dispatch('createCategory', {
						title: this.title,
						limit: this.limit
					});

					this.title = '';
					this.limit = '1';
					this.$v.$reset();

					this.$message('Категория была создана.')

					this.$emit('created', newCategory);
				} catch (e) {
					throw (e);
				}

			}
		}
	}

</script>
