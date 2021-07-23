<template>
	<ul class="sidenav app-sidenav" :class="{open: value}">
		<router-link
			v-for="link in links"
			:key="link.url"
			:to="link.url"
			v-slot="{ href, isExactActive, navigate }"
		>
			<li :class="{ active: isExactActive }">
				<a :href="href" class="waves-effect waves-orange" @click="navigate">{{link.name}}</a>
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
		props: ['value'],
		data: () => ({
			links
		})
	}

</script>
