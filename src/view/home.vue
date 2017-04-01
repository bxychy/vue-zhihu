<template>
	<div>
		<!--头部轮播组件-->
		<m-swipe swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
			<div @click="go(top.id)" v-for="top in tops" class="swiper-slide" slot="swiper-con">
				<img :src="top.image">
				<div></div>
				<h3>{{top.title}}</h3>
			</div>
		</m-swipe>
		
		<!--新闻列表-->
		<div class="newsList" v-for="list in lists">
			<p class="newsList-time">{{list.date.substring(0,4)+"/"+list.date.substring(4,6)+"/"+list.date.substring(6,8)}}</p>
			<div class="newsList-con" link @click="go(storie.id)" v-for="storie in list.stories">
				<img :src="storie.images[0]" />
				<p>{{storie.title}}</p>
			</div>
		</div>
		
		<!--首次加载动画-->
		<div class="loading" v-if="!lists.length&&!refreshing">
			<span class="left"></span>
		</div>
		
		<!--<button @click="loadMore" style="width:50px;height:50px;"></button>-->
		
			
		<!-- 滑动加载更多组件 -->
		<init-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
	</div>
</template>

<script>
import api from './../api/index'
import {mapState} from 'vuex'
export default{
	computed:{
		...mapState({
//			circle: state => state.circleFlag,
		})
	},
	mounted() {
		this.getList(1);
		this.scroller = this.$el;
		var swiper = this.$refs.swiper;
		if (swiper.dom) {
			this.swiper = swiper.dom;
		}
	},
	data(){
		return{
			refreshing: false,
			trigger: null,
			loading: false,
			count: 1,
			scroller: null,
			lists: [],
			swiper: "",
			tops: []
		}
	},
	methods:{
		go(id) {
			this.$router.push({
				path: "conter",
				query: {
					id: id
				}
			});
		},
		getList(type) {
			var vue = this;
			if (type) {
				api.getNews().then(function(data) {
					console.log('data-home-65',data.data);
					vue.tops = data.data.top_stories;
					vue.lists.push(data.data);
					vue.loading = false;

				});
			}else{
				api.getNewsByDate(vue.GetDate(vue.count)).then(function(data){
					vue.lists.push(data.data);
					vue.loading = false;
					console.log('lists-75',data.data);
				});
			}
		},
		loadMore() {
			let vue = this;
			this.loading = true;
			setTimeout(() => {
				vue.count--;
				vue.getList();
			}, 500)
		},
		GetDate(Count) {
			var nowTime = new Date();
			nowTime.setDate(nowTime.getDate() + Count); //获取AddDayCount天后的日期
			
			var year = nowTime.getFullYear();
			var month = nowTime.getMonth() + 1; //获取当前月份的日期
			month = month > 10 ? month : "0" + month
			var day = nowTime.getDate();
			day = day >= 10 ? day : "0" + day;
			return year + "" + month + "" + day;
		}
	}
}
</script>

<style>
img{width: 100%;}
	
.app-view .swiper-container{width:100%;}
.app-view .swiper-slide{height: 8rem;overflow: hidden;position: relative;}
.app-view .swiper-container-horizontal .swiper-pagination-bullets{bottom: 1rem;width: 95%;text-align: right;}
.app-view .newsList:nth-child(2){margin-bottom: 0;padding-top: 0;}
.app-view .newsList:nth-child(2) .newsList-time{top: -.8rem;}

	
.swiper-slide div{top: 0;left: 0;width: 100%;height: 100%; opacity: 0.4;position: absolute;}
.swiper-slide img{top: 50%;position: relative;transform: translate(0, -50%);}
.swiper-slide h3{width: 70%;color: #fff;margin: 0;font-size: 0.5rem;line-height: 1rem;right: 5%;bottom: 2.6rem;text-align: right;position: absolute;text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);}

.newsList{width: 90%;z-index: 1;position: relative;padding-top: 0.8rem;margin: .8rem auto 0;}
.newsList .newsList-time{top: 0;margin: 0;color: #fff;padding: 0 1rem;font-size: 0.4rem;line-height: 0.8rem;letter-spacing: 0.1rem;border-radius: 0.4rem;text-align: center;background-color:yellow;transform: translate(0,-50%);position: absolute;box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);z-index:2;}
.newsList .newsList-con{cursor: pointer;display: flex;padding: 0.3rem;margin-bottom: 0.4rem;border-radius: 0.15rem;align-items: center;background-color: #fff;box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);}
.newsList .newsList-con img{width: 2rem;margin-right: 0.4rem;}
.newsList .newsList-con p{color:#5B7492;font-size: 0.4rem;text-align: justify;margin: 0;}

.loading{width: 25%;height: 0.4rem;margin: 25% auto 0;position: relative;}
.loading span{display: block;width: 0.4rem;height: 0.4rem;border-radius: 50%;position: absolute;background: @blue;transform: translate(-50%,0);}
.loading .left{background:yellow;animation: lLeft 2.5s ease infinite;}
@keyframes lLeft{
	0%{left: 0;}
    25%{left: 50%;background: yellow;}
    50%{left: 100%;background: blue;}
    75%{left: 50%;background: gray;}
    100%{left: 0;}
}
</style>