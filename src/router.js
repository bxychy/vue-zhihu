import Vue from 'vue'
import Router from 'vue-router'
import home from './view/home.vue'

Vue.use( Router )

const router = new Router({
	mode: 'hash',
	routes: [
		{path: '/',component: home,name: 'home'}
	]
})
export default router