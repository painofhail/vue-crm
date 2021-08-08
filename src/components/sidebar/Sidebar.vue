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
				<a :href="href" class="sidebar__link waves-effect waves-orange" @click="navigate">{{link.name}}</a>
			</li>
		</router-link>
	</ul>
</template>

<script>
	import localizeFilter from '@/filters/localize.filter';

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
				links : [
					{ name: localizeFilter('Bill'), url: '/' },
					{ name: localizeFilter('History'), url: '/history' },
					{ name: localizeFilter('Planning'), url: '/planning' },
					{ name: localizeFilter('Record'), url: '/record' },
					{ name: localizeFilter('Categories'), url: '/categories' }
				]
			}
		},
	}
</script>
