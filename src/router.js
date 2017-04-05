import Vue from 'vue'
import Router from 'vue-router'
import home from './view/home.vue'
import conter from './view/conter.vue'
import newIndex from './view/newsListIndex.vue'


Vue.use( Router )

const router = new Router({
	mode: 'hash',
	routes: [
		{path: '/',component: home,name: 'home'},
		{path: '/conter',component: conter,name: 'conter'},
		{path: '/newIndex',component: newIndex,name: 'newIndex'},
		{path: '*',redirect: '/'}
	]
})
export default router