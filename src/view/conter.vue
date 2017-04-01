<template>
	<div class="con">
		<div class="loading" v-if="!data.body">
			<span class="left"></span>
			<span class="middle"></span>
			<span class="right"></span>
		</div>
		<div v-if="data.image" class="con-img">
			<img :src="data.image" />
			<div class="con-img-mask"></div>
			<h2>{{data.title}}</h2>
		</div>
		<div class="con-answer"  v-html="data.body"></div>
		<!--<back-scroll :scroller="scroller" :flag="circle"></back-scroll>-->
	</div>
</template>

<script>
import api from './../api/index'

export default {
	data(){
		return {
			scroller: window,
			data: ""
		}
	},
	activated: function() {
		let vue = this;
		api.getNewsById(this.$route.query.id).then(function(data) {
			console.log('conter-27',data);
			vue.data = data.data;
		});
	},
	deactivated: function() {
		this.data = "";
	},
}	
</script>

<style>
.con{color: #666;height: 100vh;}
.con .con-img{height: 6rem;overflow: hidden;position: relative;}
.con .con-img img{top: 50%;width: 100%;position: relative;transform: translate(0,-50%);}
.con .con-img h2{width: 60%;margin: 0;padding: 0;right: 5%;bottom: 1rem;text-align: right;font-size: 0.45rem;color: rgba(255,255,255,.9);position: absolute;text-shadow: 0 0 5px rgba(0,0,0,.5);}
.con .con-img .con .con-img-mask{top: 0;left: 0;width: 100%;height: 100%;background: rgba(91,116,146,0.50);position: absolute;}
</style>