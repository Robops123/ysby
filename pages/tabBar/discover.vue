<template>
	<view class="padding">
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>附近商家</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>优质产品</text></view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom' >
		<view class="" v-if="active==1">
			<view class="sp-item3"  v-for="(item,index) in dataList" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image src="../../static/img/pic/logo.png" mode="" class="headface"></image>
					</view>
					<view class="sp-item3-top-middle">
						<view>小象母婴馆</view>
						<view>
							<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">1429人关注 | <text class="s2">500m以内</text></text>
						</view>
					</view>
					<view class="enter-button" @click="toShop">进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
				</view>
			</view>
		</view>
		
		
			<view class="box" v-if="active==2">
				<view class="list" v-for="(item,index) in dataList" :key='index'>
					<image src="../../static/img/bg/activity.png" mode=""></image>
					<view class="word">
						<view class="s3 ellipsis">婴儿洗头帽西羽毛防水塞都是</view>
						<view class="s1 cr">$79<text class="s2 cg fr">已售516件</text></view>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				active:1,
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:''
			}
		},
		components:{
			uniRate,
			uniLoadMore
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   mounted(){
		   	var that=this
		   	this.getList(this.page)
		   	setTimeout(function(){
		   		that.$getHeight('#sv',(res) =>{
		   			that.sh=res
		   		})
		   	},0)
		   },
		methods:{
			toShop(){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview`
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='/wangtosale_list'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.allnum
					  that.dataList=that.dataList.concat(res.data)
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			toBottom(){
				if(this.noMore){
					this.more='noMore'
					return;
				}
				var that=this
				this.more='loading'
			  // setTimeout(function(){
				  that.page++
				  that.getList(that.page)
			  // },2000)
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.nav-bar{
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
	}
	.nav-left{
		padding-right: 50upx;
		text-align: right;
	}
	.nav-right{
		padding-left: 50upx;
		text-align: left;
	}
	.nav.active text{
		color: #000000;
		position: relative;
	}
	.nav.active text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	
	.box{
		margin-top: 20upx;
	}
	.list:nth-of-type(odd){
		margin-right: 2%;
	}
	.list{
		display: inline-block;
		vertical-align: top;
		border-radius: 10upx;
		overflow: hidden;
		width: 49%;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	.list image{
		width: 100%;
		height: 380upx;
	}
	.list .word .ellipsis{
		margin-bottom: 15upx;
	}
	.list .word{
		padding: 5upx 20upx  20upx ;
	}
	
	.sp-item3{
		border-radius: 20upx;
		background-color: #fff;
	}
	.sp-item3-top{
		padding: 20upx 30upx 0 0;
		margin: 20upx 0;
	}
	.sp-item3-top .headface{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin: 0 15upx;
	}
	.sp-item3-top-middle image{
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	.sp-item3-top-middle text text{
		color: #a9a9a9;
		margin-left: 10upx;
	}
	.sp-item3-top>view{
		display: inline-block;
		vertical-align: middle;
	}
	.enter-button{
		color: #ff8f94;
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 19upx;
	}
	.sp-item3-bottom>view{
			display: inline-block;
			vertical-align: top;
			width: 33%;
			height: 220upx;
			position: relative;
			overflow: hidden;
			border-radius: 20upx;
	}
	.sp-item3-bottom{
		padding: 0 30upx;
		/* margin: 0 18upx; */
		display: flex;
		justify-content: space-between;
		padding-bottom: 22upx;
	}
	.sp-item3-bottom image{
		width: 100%;
		height: 100%;
	}
	.sp-item3-bottom .price{
			position: absolute;
			left: 0;
			border-radius:0 20upx 0 20upx;
			bottom: 0;
			color: white;
			padding: 5upx 8upx;
			background-color: #999;
			opacity: 0.8;
		}
</style>
