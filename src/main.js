import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import swipe from './components/swipe/swipe.vue'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.component(swipe.name,swipe)

const store = new Vuex.Store({
	state: {
		num: 1,
		drawer: false,
		circleFlag: false
	},
	mutations:{
		add:(state,n)=>state.num = n
	}
})

new Vue( {
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {App}
})