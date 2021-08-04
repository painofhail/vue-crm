<template>
	<div>
		<div class="page-title">
			<h3>Новая запись</h3>
		</div>

		<Loader v-if="loading" />

		<p v-else-if="!categories.length" class="center">Категорий пока нет.
			<router-link to="/categories">Добавить новую категорию</router-link>
		</p>

		<form v-else class="form" @submit.prevent="submitHandler">
			<div class="input-field" >
				<select ref="select" v-model="category">
					<option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
				</select>
				<label>Выберите категорию</label>
			</div>

			<p>
				<label>
					<input class="with-gap"	name="type"	type="radio" value="income" v-model="type" />
					<span>Доход</span>
				</label>
			</p>

			<p>
				<label>
					<input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
					<span>Расход</span>
				</label>
			</p>

			<div class="input-field">
				<input id="amount" type="number" v-model.number="amount" :class="{ invalid: minValue }">
				<label for="amount">Сумма</label>
				<span class="helper-text invalid" v-if="minValue">Минимальное значение: {{ requiredMinValue }}</span>
			</div>

			<div class="input-field">
				<input id="description"	type="text" v-model="description" :class="{ invalid: emptyDescription }">
				<label for="description">Описание</label>
				<span	class="helper-text invalid" v-if="emptyDescription">Введите описание</span>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
	import { required, minValue } from 'vuelidate/lib/validators';
	import { mapGetters } from 'vuex';

	export default {
		name: 'Record',
		data: () => ({
			loading: true,
			select: null,
			categories: [],
			category: null,
			type: 'income',
			amount: 1,
			description: ''
		}),
		validations: {
			amount: { minValue: minValue(1) },
			description: { required }
		},
		computed: {
			...mapGetters(['userInfo']),
			minValue () {
				return this.$v.amount.$dirty && !this.$v.amount.minValue;
			},
			emptyDescription () {
				return this.$v.description.$dirty && !this.$v.description.required;
			},
			requiredMinValue () {
				return this.$v.amount.$params.minValue.min;
			},
			canCreateRecord () {
				if (this.type === 'income') {
					return true;
				} else if (this.type === 'outcome') {
					return (this.userInfo.bill >= this.amount)
				}
			}
		},
		async mounted () {
			this.categories = await this.$store.dispatch('fetchCategories');
			this.loading = false;

			// Хак, чтобы select успел отрисоваться
			setTimeout(() => {
				this.select = M.FormSelect.init(this.$refs.select);
				M.updateTextFields();	// что бы materialize зачёл начальное значение инпутов
			}, 0);

			if (this.categories.length) {
				this.category = this.categories[0].id;
			}
		},
		destroyed () {
			if (this.select && this.select.destroy) {
				this.select.destroy();
			}
		},
		methods: {
			async	submitHandler () {
				if (this.$v.$invalid) {
					this.$v.$touch()
					return;
				}

				if (this.canCreateRecord) {
					try {
						await this.$store.dispatch('createRecord', {
							categoryId: this.category,
							amount: this.amount,
							description: this.description,
							type: this.type,
							date: new Date().toJSON()
						})

						const bill = this.type ==='income'
							? this.userInfo.bill + this.amount
							: this.userInfo.bill - this.amount

						await this.$store.dispatch('updateUserInfo', { bill });

						this.$message('Запись успешно создана');

						this.$v.$reset();
						this.amount = '1';
						this.description = '';
					} catch (e) {

					}
				} else {
					this.$message(`Недостаточно средств на счёте (${this.amount - this.userInfo.bill})`)
				}
			}
		}
	}

</script>
