<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>综合</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>最新</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)">
				<text style="display: inline-block;vertical-align: middle;margin-right: 20upx;">价格</text>
				<view style="display: inline-block;vertical-align: middle;">
					<view class="iconfont icon-fire s2"></view>
					<view class="iconfont icon-fire s2"></view>
				</view>
			</view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>热卖</text></view>
		</view>
		
		<scroll-view scroll-y="true" class="content">
			<view class="box">
				<view class="list" v-for="(item,index) in 10" :key='index' @click="to('goodsDetail')">
					<image src="../../static/img/bg/activity.png" mode=""></image>
					<view class="word">
						<view class="s3 ellipsis">婴儿洗头帽西羽毛防水塞都是</view>
						<view class="s1 cr">$79<text class="s2 cg fr">已售516件</text></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				active:1,
			}
		},
		methods:{
			toggle(t){
				this.active=t
			},
			to(w){
				uni.navigateTo({
					url:`/pages/index/${w}`
				})
			},
		}
	}
</script>

<style>
	.nav-bar{
		border-top: 20upx solid #f3f3f3;
		padding: 20upx 0;
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
	
	
	.content{
		box-sizing: border-box;
		padding: 0 20upx;
		background-color: #f3f3f3;
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
