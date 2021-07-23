<template>
	<ul class="sidenav app-sidenav" :class="{open: value}">
		<router-link
			v-for="link in links"
			:key="link.url"
			:to="link.url"
			v-slot="{ href, isExactActive, navigate }"
		>
			<li :class="{ active: isExactActive }">
				<a :href="href" class="waves-effect waves-orange pointer" @click="navigate">{{link.name}}</a>
			</li>
		</router-link>
	</ul>
</template>

<script>

const links = [
	{name: 'Счет', url: '/', exact: true},
	{name: 'История', url: '/history', exact: false },
	{name: 'Планирование', url: '/planning', exact: false},
	{name: 'Новая запись', url: '/record', exact: false},
	{name: 'Категории', url: '/categories', exact: false}
]

	export default {
		name: 'Sidebar',
		props: ['value'],
		data: () => ({
			links
		})
	}

</script>
