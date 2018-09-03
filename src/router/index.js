import Vue from 'vue'
import Router from 'vue-router'
import homeSonRoute from './home'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect:'/manage/organiZation'
		},
		{
			path: '/manage',
			name: 'manage',
			component: resolve => require(['@view/manage'], resolve),
			meta: {
				title: 'manage'
			},
			children: homeSonRoute
		},{
			path: '/404',
			name: '404',
			component: resolve => require(['@view/404'], resolve),
			meta: {
				title: '404'
			},
		}
		// {
		// 	path: '/login',
		// 	name: 'login',
		// 	component: resolve => require(['@view/login'], resolve),
		// 	meta: {
		// 		title: '404'
		// 	},
		// },
		// {
		// 	path: '*',
		// 	redirect: '/404',
		// 	hidden: true
		// }
	]
})