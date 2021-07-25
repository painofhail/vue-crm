<template>
	<header class="header">
		<div class="header__wrapper">
			<div class="header__nav-left">
				<a :class="['burger-menu', {'burger-menu--open': burgerOpen }]" href="#" @click.prevent="toggleMenu">
					<span class="burger-menu__part" />
					<span class="burger-menu__part" />
					<span class="burger-menu__part" />
				</a>
				<span class="">12.12.12</span>
			</div>

			<ul class="hide-on-small-and-down">
				<li>
					<a class="dropdown-trigger black-text" href="#" data-target="dropdown">
						USER NAME
						<i class="material-icons right">arrow_drop_down</i>
					</a>

					<ul id='dropdown' class='dropdown-content'>
						<li>
							<a href="#" class="black-text"><i class="material-icons">account_circle</i>Профиль</a>
						</li>
						<li class="divider" tabindex="-1"></li>
						<li>
							<a href="#" class="black-text"><i class="material-icons">assignment_return</i>Выйти</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		data () {
			return {
				burgerOpen: false
			}
		},
		methods: {
			toggleMenu () {
				this.burgerOpen = !this.burgerOpen;
				this.$emit('toggleMenu');
			}
		}
	}
</script>
