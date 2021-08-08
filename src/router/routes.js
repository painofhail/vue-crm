export const routes = [
	// ==================== EMPTY =======================
	{
		path: '/auth',
		name: 'auth',
		meta: { layout: 'empty' },
		component: () => import('../views/Auth.vue')
	},
	{
		path: '/register',
		name: 'register',
		meta: { layout: 'empty' },
		component: () => import('../views/Register.vue')
	},
	// ==================== MAIN =======================
	{
		path: '/categories',
		name: 'categories',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Categories.vue')
	},
	{
		path: '/detail/:id',
		name: 'detail',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Detail.vue')
	},
	{
		path: '/history',
		name: 'history',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/History.vue')
	},
	{
		path: '/',
		name: 'Home',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Home.vue')
	},
	{
		path: '/planning',
		name: 'planning',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Planning.vue')
	},
	{
		path: '/profile',
		name: 'profile',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Profile.vue')
	},
	{
		path: '/record',
		name: 'record',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Record.vue')
	}
];
