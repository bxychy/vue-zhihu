<template>
	<div class="newsListIndex">
		<div class="loading" v-if="!ListIndex">
			<span class="left"></span>
		</div>
		<div class="" v-else>
			<div class="listindex">
				<img :src="ListIndex.image">
				<h3>
					<p>{{ListIndex.description}}</p>
					<p>{{ListIndex.name}}</p>
				</h3>
			</div>
			<div class="newsList">
				<div class="newsList-con" link @click="go(item.id)" v-for="item in ListIndex.stories">
					<img v-if="item.images" :src="item.images[0]" />
					<p>{{item.title}}</p>
				</div>
			</div>
		</div>
		<!--<div  :flag="circle" :scroller="scroller"></div>-->
	</div>
</template>

<script>
import{
	mapState
} from 'vuex'
import api from './../api/index'
export default{
	computed: {
		...mapState({
			flag: state => state.num,
//			circle: state => state.circleFlag
		})
	},
	data() {
		return {
			ListIndex: "",
//			scroller:window
		}
	},
	watch:{
		flag: function() {
			this.getNewsListIndex();
		}
	},
	mounted: function() {
		this.getNewsListIndex();
//		this.scroller = this.$el;
	},
	activated: function() {
		let that = this;
	},
	methods:{
		go(id){
			this.$router.push({
				path:"conter",
				query:{
					id:id
				}
			})
		},
		getNewsListIndex(){
			var that=this;
			this.ListIndex="";
			api.getTopicsById(this.$route.query.id).then(function(data){
				that.ListIndex=data.data;
				console.log('ListIndex',data.data);
				var dom=document.querySelector(".app-view");
				dom.scrollTop = 0;
			})
		}
	}
}
</script>

<style>
.listindex{height: 8rem;position: relative;overflow: hidden;}
.listindex div{top: 0;left: 0;width: 100%;height: 100%;opacity: 0.4;position: absolute;background-color: #5B7492;}
.listindex img{width: auto;height: 8rem;left: 50%;transform: translate(-50%,0);position: relative;}
.listindex h3,p{margin: 0;}
.listindex h3{width: 70%;color: #fff;font-size: 0.5rem;line-height: 1rem;right: 5%;bottom: 1.5rem;text-align: right;position: absolute;text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);}
.listindex h3 p:first-child{position: relative;margin-bottom: 0.5rem;}
.listindex h3 p:first-child:before {content: "";width: 3rem;bottom: -.3rem;right: 0;display: block;position: absolute;border: 2px solid #FFD300;}
.list{margin-top: -.5rem;}

</style>