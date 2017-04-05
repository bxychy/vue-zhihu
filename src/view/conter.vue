<template>
	<div class="con">
		<div class="loading" v-if="!data.body">
			<span class="left"></span>
			<!--<span class="middle"></span>
			<span class="right"></span>-->
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
.con .con-img .con-img-mask{top: 0;left: 0;width: 100%;height: 100%;background: rgba(91,116,146,0.50);position: absolute;}
.con .con-answer{padding: 5%;position: relative;}
.con .con-answer h2,.con .con-answer li,.con .con-answer p{text-align: justify!important;}
.con .con-answer h2{color: #5B7492;position: relative;z-index: 1;}
.con .con-answer a{color:#FFD300;word-break: break-word;}
.con .con-answer .headline-title{color: #5B7492;}
.con .con-answer .meta{text-align: left;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
.con .con-answer .meta .avatar{vertical-align: middle;display: inline-block;width: 0.6rem;margin-right: 0.1rem;}
.con .con-answer .meta span{color: #666;}
.con .con-answer .meta .author{color: #FC4482;display: inline-table;}
.con .con-answer .content{font-size: 0.35rem;}
.con .con-answer .question blockquote{text-align: justify;position: relative;}
.con .con-answer .question blockquote::before{content: '';left: -.5rem;display: block;height: 100%;border-left: .1rem solid #FFD300;position: absolute;}
.con .con-answer .question blockquote:first-child{padding-top: 0;}
.con .con-answer .question blockquote:last-child{padding-bottom: 0;}
.con .con-answer .question blockquote:last-child::before{display: none;}
.con .con-answer .question ul{padding-left: 0.3rem;}
.con .con-answer .question ul li{text-align: left;}
.con .con-answer .content-image{width:inherit;max-width: 100%;}
.con .con-answer .view-more{text-align: center;margin-bottom: .5rem;}
.con .con-answer .view-more a{z-index: 1;position: relative;}
</style>