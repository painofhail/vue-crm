<template>
	<ul class="sidebar" :class="{'sidebar--open': show}">
		<router-link
			v-for="link in links"
			:key="link.url"
			:to="link.url"
			v-slot="{ href, isExactActive, navigate }"
			custom
		>
			<li :class="['sidebar__item', { 'sidebar__item--active': isExactActive }]">
				<a :href="href" class="sidebar__link" @click="navigate">{{link.name}}</a>
			</li>
		</router-link>
	</ul>
</template>

<script>
	const links = [
		{ name: 'Счет', url: '/' },
		{ name: 'История', url: '/history' },
		{ name: 'Планирование', url: '/planning' },
		{ name: 'Новая запись', url: '/record' },
		{ name: 'Категории', url: '/categories' }
	]

	export default {
		name: 'Sidebar',
		props: {
			show: {
				type: Boolean,
				default: true,
				required: true
			}
		},
		data () {
			return {
				links
			}
		},
	}
</script>
