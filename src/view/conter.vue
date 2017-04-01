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
</style>