<template>
	<view>
		<view class="top">
			<view>
				<view class="process">等待卖家发货</view>
				<view class="intro">您的包裹整装待发</view>
			</view>
			<image src="../../static/img/bg/activity.png" mode=""></image>
		</view>
		<view class="about padding margin">
			<view class="icon-fire iconfont"></view>
			<view class="s3">
				<view>羞涩地说  12321312312312</view>
				<view style="margin-top: 10upx;">北京市还定去超大号速度100</view>
			</view>
		</view>
		<view class="padding" style="background-color: #fff;">
			<text>实付金额</text>
			<text class="fr cr">$45.00</text>
		</view>
		
		<view style="text-align: center;margin-top: 120upx;">
			<button type="default" class="btn" @click="to('orderDetail')">订单详情</button>
			<button type="default" class="btn">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			to(w){
				uni.navigateTo({
					url:'./orderDetail'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.top{
		display: flex;
		align-items: center;
		padding: 30upx 30upx 40upx;
		justify-content: space-between;
		background: #ff757b;
		color: white;
	}
	.top image{
		width: 90upx;
		height: 90upx;
	}
	.process{
		font-size: 34upx;
		line-height: 40upx;
	}
	.intro{
		font-size: 26upx;
	}
	.margin{
		margin: 20upx 0;
		background-color: #fff;
	}
	.about>.iconfont{
		margin-right: 30upx;
	}
	.about>view{
		display: inline-block;
		vertical-align: middle;
	}
	.btn{
		width: 35%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border: 1px solid #e0e0e0 !important;
		font-size: 30upx;
		display: inline-block;
		margin: 0 5%;
		border-radius: 80upx;
		background-color: #fff !important;
	}
</style>
