<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 -->
			<uni-status-bar />
		<!-- #endif -->
		<view class="top">
			<!-- #ifdef APP-PLUS || H5 -->
				<view class="icon-fire iconfont" @click="back"></view>
			<!-- #endif -->
			<view class="top-search">
				<view class="icon-fire iconfont" @click="search"></view>
				<input type="text" placeholder="寻找附近的商家">
			</view>
				<view class="icon-fire iconfont fr" @click="share"></view>
		</view>
		
		<!--  -->
		<view class="sp-item3-top">
			<view>
				<image src="../../static/img/pic/logo.png" mode="" class="headface"></image>
			</view>
			<view class="sp-item3-top-middle">
				<view>小象母婴馆</view>
				<view>
					<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
					<text class="s3 cg">1429人关注</text>
				</view>
			</view>
			<view class="enter-button" @click="toShop">关注</view>
		</view>
		
		<image src="../../static/img/pic/logo.png" mode="" class="banner"></image>
		
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>精选</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>新品</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>销量</text></view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>价格</text></view>
		</view>
		
		<scroll-view scroll-y="true" >
			<view class="padding" style="background-color:#fff;">
				<view class="box">
					<view class="list" v-for="(item,index) in 10" :key='index'>
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="word">
							<view class="s3 ellipsis">婴儿洗头帽西羽毛防水塞都是</view>
							<view class="s1 cr">$79<text class="s2 cg fr">已售516件</text></view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	export default{
		components:{
			uniStatusBar
		},
		data(){
			return{
				active:1
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			share(){
				console.log('share')
			},
			search(){
				console.log('search')
			},
			toggle(t){
				this.active=t
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.top{
		padding: 10upx 0;
		background-color:#fff;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.top-search{
		padding: 10upx ;
		box-sizing: border-box;
		background-color: #f4f4f4;
		border-radius: 50upx;
	}
	.top-search .iconfont{
		display: inline;
		padding-right: 20upx;
		/* vertical-align: middle; */
	}
	.top-search input{
		width: 60%;
		display: inline-block;
		 vertical-align: middle;
	}
	
	
	
	.sp-item3-top{
		background-color:#fff;
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
	.enter-button{
		color: #ff8f94;
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 19upx;
	}
	
	
	.banner{
		width: 100%;
		height: 320upx;
	}
	
	.nav-bar{
		padding: 25upx 0;
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 25%;
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
</style>
