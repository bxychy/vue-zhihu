import Vue from 'vue'
import Router from 'vue-router'
import home from './view/home.vue'
import conter from './view/conter.vue'


Vue.use( Router )

const router = new Router({
	mode: 'hash',
	routes: [
		{path: '/',component: home,name: 'home'},
		{path: '/conter',component: conter,name: 'conter'},
		{path: '*',redirect: '/'}
	]
})
export default router