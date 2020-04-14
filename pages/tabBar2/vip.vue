<template>
	<view style="border-top: 20upx solid #F3F3F3;">
		<view class="list" v-for="(item,index) in 5" :key='index'>
			<view>
				<image src="../../static/img/pic/logo.png" mode=""></image>
			</view>
			<view>
				<view class="s1">月亮都知道</view>
				<view class="s3 cg time">关注时间:2020-03-30 12:13:32</view>
			</view>
			<view class="btn">移除粉丝</view>
		</view>
	</view>
</template>

<script>
	export default{
		mounted(){
			console.log('vip mounted')
		},
		onShow(){
			console.log('vip show')
		}
	}
</script>

<style>
	.list>view{
		display: inline-block;
		vertical-align: middle;
	}
	.list{
		padding: 20upx;
		background-color: #fff;
	}
	.list image{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.list .time{
		margin-top: 25upx;
	}
	.list .btn{
		float: right;
		margin-top: 40upx;
		padding: 4upx 10upx;
		border: 1px solid #ff6d7e !important;
		color: #ff6d7e !important;
		text-align: center;
		border-radius: 50upx;
	}
</style>
