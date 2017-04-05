<template>
	<div id="app">
		<header>
			<i v-if="!flag" class="iconfont icon-ic_menu" @click="toggle(true)"></i>
			<i v-if="flag" class="iconfont icon-ic_back" @click="back()"></i>
		</header>
		<aside class="aside" :class="{open:open,docked:docked}" @click="toggle()">
			<ul>
				<li :class="{select:num == 1}" @click="change(1)" >
					<span>首页</span>
					<i class="iconfont" :class="{'iconcolor icon-ic_star_black':num == 1,'icon-ic_star':num != 1}" />
				</li>
				<li  v-for="(list, index) in lists" :class="{select:num == index+2}" @click="change(index+2,list.id)">
					<span>{{list.name}}</span>
					<i class="iconfont " :class="{'iconcolor icon-ic_star_black':num == index+2,'icon-ic_star':num != index+2}" />
				</li>
				<li @click="jump()">
					<span>项目地址</span>
					<i class="iconfont icon-github"/>
				</li>
			</ul>
		</aside>
		
		<transition :name="transitionName">
			<keep-alive>
				<router-view class="app-view" :class="{'app-view-hidden':docked}"></router-view>
			</keep-alive>
		</transition>
		
	</div>
</template>

<script>
import api from './api/index'
import {mapState} from 'vuex'
export default{
	computed:{
		...mapState({
//			circle: state => state.circleFlag,
			num: state => state.num,
			flag: state => state.drawer
		})
	},
	data(){
		return {
			lists: [],
			open: false,
			docked: false,
			transitionName: 'slide-left',
		}
	},
	mounted: function() {
		let vue = this;
		api.getTopics().then(function(data) {
//			console.log('data',data);
			vue.lists = data.data.others;
		});
	},
	watch: {
		'$route' (to, from) {
//			this.transitionName = to.path != "/con" ? 'slide-right' : 'slide-left';
		}
	},
	methods:{
		toggle(flag){
			if(!this.open){
				this.docked=true;
				this.open=true;
			}else{
				this.open = false;
				var vue = this;
				setTimeout(function() {
					vue.docked = false;
				}, 300);
			}
		},
		change(n,id){
			var path = n == 1 ? 'home' : 'newIndex';
			this.$router.push({
				path:path,
				query:{
					id:id || ''
				}
			});
			this.$store.commit('add',n);
		},
		jump(){
//			window.open("https://github.com/walleeeee/daily-zhihu");
		},
	}
}
</script>

<style>
header{width: 100%;height: 1.5rem;z-index: 9;padding-left: 5%;position: fixed;background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.51) 95%);}
header .iconfont{color: #fff;font-size: 0.8rem;top: 20%;position: relative;}
	
.aside{z-index: 11;left: 0;right: 0;top: 0;bottom: 0;position: fixed;visibility: hidden;}
.aside ul{margin: 0;float: left;width: 60%;height: 100%;padding: 1.3rem 0.5rem 0.5rem;overflow: auto;background: rgba(91, 116, 146, 0.75);transform: translate(-100%, 0);transition: transform 0.3s ease;-webkit-overflow-scrolling: touch;}
.aside.docked{visibility: visible;}
.aside.open ul{transform: translate(0);}
.aside ul li{cursor: pointer;font-size: 0.43rem;list-style: none;color: #fff;margin-top: 20px;}
.aside ul li .iconfont{float: right;font-size: 0.6rem;}
.aside ul li.select{color: #FFD300;}

.app-view{z-index: 1;width: 100vw;height: 100vh;overflow: auto;position: absolute;transition: transform 0.3s ease;-webkit-overflow-scrolling: touch;}
</style>