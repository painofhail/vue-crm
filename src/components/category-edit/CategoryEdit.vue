<template>
	<div class="col s12 m6">
		<div>
			<h4 class="page-subtitle">Редактировать</h4>

			<form @submit.prevent="submitHandler">
				<div class="input-field">
					<select ref="select" v-model="current">
						<option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
					</select>
					<label>Выберите категорию</label>
				</div>

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

				<button class="btn waves-effect waves-light" type="submit">
					Обновить
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, minValue } from 'vuelidate/lib/validators';

	export default {
		name: 'CategoryEdit',
		props: {
			categories: {
				type: Array,
				required: true
			}
		},
		data: () => ({
			select: null,
			title: '',
			limit: 1,
			current: ''
		}),
		validations: {
			title: { required },
			limit: { minValue: minValue(1) }
		},
		watch: {
			current (catId) {
				const { title, limit } = this.categories.find(c => c.id === catId);
				this.title = title;
				this.limit = limit;
			}
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
		created () {
			const { id, title, limit } = this.categories[0];
			this.current = id;
			this.title = title;
			this.limit = limit;
		},
		mounted () {
			M.updateTextFields();	// что бы materialize зачёл начальное значение инпутов
			this.select = M.FormSelect.init(this.$refs.select);
		},
		destroyed () {
			if (this.select && this.select.destroy) {
				this.select.destroy();
			}
		},
		methods: {
			async submitHandler () {
				if (this.$v.$invalid) {
					this.$v.$touch()
					return;
				}

				try {
					const categoryData = {
						id: this.current,
						title: this.title,
						limit: this.limit
					}
					await this.$store.dispatch('updateCategory', categoryData);

					this.$message('Категория успешно обновлена.')

					this.$emit('updated', categoryData)
				} catch (e) {
					throw (e);
				}
			}
		}
	}

</script>
