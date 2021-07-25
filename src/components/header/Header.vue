<template>
	<header class="header">
		<div class="header__wrapper">
			<div class="header__nav-left">
				<a :class="['burger-menu', {'burger-menu--open': burgerOpen }]" href="#" @click.prevent="toggleMenu">
					<span class="burger-menu__part" />
					<span class="burger-menu__part" />
					<span class="burger-menu__part" />
				</a>
				<span class="">{{date | dateFilter('date time')}}</span>
			</div>

			<ul class="hide-on-small-and-down">
				<li>
					<a
						class="dropdown-trigger black-text"
						href="#"
						data-target="dropdown"
						ref="dropdown"
					>
						<span>USER NAME</span>
						<i class="material-icons">arrow_drop_down</i>
					</a>

					<ul id='dropdown' class='dropdown-content'>
						<li>
							<router-link to="/profile" class="black-text">
								<i class="material-icons">account_circle</i>
								Профиль
							</router-link>
						</li>
						<li class="divider" tabindex="-1"></li>
						<li>
							<a to="#" class="black-text" @click.prevent="logout">
								<i class="material-icons">assignment_return</i>
								Выйти
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>

	const dropdownOptions = {
		constrainWidth: false,
		coverTrigger: false,
		hover: false
	};

	export default {
		name: 'Header',
		data: () => ({
			dropdownOptions,
			burgerOpen: false,
			date: new Date(),
			interval: null,
			dropdown: null
		}),
		mounted () {
			this.interval = setInterval(() => {
				this.date = new Date();
			}, 1000)

			this.dropdown = M.Dropdown.init(this.$refs.dropdown, dropdownOptions);
		},
		beforeDestroy() {
			clearInterval(this.interval);

			if (this.dropdown && this.dropdown.destroy) {
				this.dropdown.destroy();
			}
		},
		methods: {
			toggleMenu () {
				this.burgerOpen = !this.burgerOpen;
				this.$emit('toggleMenu');
			},
			logout () {
				console.log('logout');
				this.$router.push('/auth?message=logout')
			}
		}
	}
</script>
