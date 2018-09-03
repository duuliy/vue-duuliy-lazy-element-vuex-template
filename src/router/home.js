export default [{
	title: '组织机构',
	path: 'organiZation',
	name: 'organiZation',
	fullPath:'/manage/organiZation',
	fatherTitle: '/manage',
	icon: 'w_icon icon-zuzhijigou',
	component: resolve => require(['@view/homeSons/organiZation'], resolve)
},
{
	title: '用户统计',
	path: 'userStati',
	name: 'userStati',
	fullPath:'/manage/userStati',
	fatherTitle: '/manage',
	icon: 'w_icon icon-yhgl',
	component: resolve => require(['@view/homeSons/userStati'], resolve)
},
{
	title: '用户详情',
	path: 'userDetails',
	name: 'userDetails',
	fullPath:'/manage/userDetails',
	fatherTitle: '/manage',
	icon: 'w_icon icon-yonghu',
	component: resolve => require(['@view/homeSons/userDetails'], resolve)
},
]