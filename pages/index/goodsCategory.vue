<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 -->
			<uni-status-bar />
		<!-- #endif -->
		<view class="top-nav">
			<!-- #ifdef APP-PLUS || H5 -->
				<view class="icon-fire iconfont" @click="back"></view>
			<!-- #endif -->
				<view class="nav-bar">
					<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>商品专区</text></view>
					<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>品牌专区</text></view>
				</view>
		</view>
		
		<!-- 菜 -->
		<view class="content">
			<scroll-view scroll-y="true" class="left-scroll">
				<view class="">
					<view class="left-item s1 " :class="{active:tabActive==index}" @click="toggleTab(index)"      v-for="(item,index) in 20" :key='index'>
						<text>睡眠用品</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right-scroll" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="">
					<image src="../../static/img/bg/activity.png" mode="" class="banner"></image>
					<view class="s1 headline">全部浴室用品商家</view>
					<!-- 区 -->
					<view class="right-content">
						<view class="right-item" v-for="(item,index) in dataList" :key='index' @click="to('goodsList')">
							<image src="../../static/img/bg/activity.png" mode=""></image>
							<view class="s3 cg">多里精灵</view>
						</view>
					</view>
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniStatusBar,
			uniLoadMore
		},
		data(){
			return{
				active:1,
				tabActive:0,
				sh:'',
				dataList:[],
				page:1,
				pageSize:20,
				total:0,
				more:''
			}
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
			toggleTab(t){
				this.tabActive=t
			},
			to(w){
				uni.navigateTo({
					url:'./goodsList'
				})
			},
			back(){
				uni.navigateBack({
					delta:1
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
	.top-nav{
		z-index: 999;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx 0 20upx 40upx;
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
	}
	
	.nav-bar{
		position: absolute;
		left: 70px;
		right: 70px;
		top: 0;
		padding: 20upx 0;
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
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
	
	.content{
		background-color: #f7f7f7;
		position: absolute;
		padding-top: 20upx;
		top: 72upx;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
	}
	.left-scroll{
		width: 220upx;
		text-align: center;
		display: inline-block;
	}
	.left-item{
		margin: 25upx 0;
		padding: 20upx 0;
	}
	.left-item.active{
		background-color: #fff;
	}
	.left-item.active text{
		display: inline-block;
		width: 100%;
		border-left: 2px solid #ff6d7e;
	}
	.right-scroll{
		padding: 25upx 30upx;
		flex: 1;
		background-color: white;
	}
	.right-scroll .banner{
		width: 100%;
		height: 240upx;
	}
	.right-scroll .headline{
		margin: 25upx 0;
	}
	.right-item{
		display: inline-block;
		vertical-align: top;
		text-align: center;
		width: 33%;
		margin: 20upx 0;
	}
	.right-item image{
		width: 100upx;
		height: 100upx;
		margin-bottom: 30upx;
	}
	.right-content{
		text-align: justify;
	}
</style>
