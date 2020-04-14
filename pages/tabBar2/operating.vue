<template>
	<view>
		<view class="top">
			<view class="set" @click="toSetting">
				<icon type="" class="iconfont icon-fire"></icon>
			</view>
			<image src="../../static/img/pic/logo.png" mode="" class="headface"></image>
			<text class="s4">月亮都知道</text>
		</view>
		<view class="item-3 s1 item-3-t bgw">
			<view>
				<view>0</view>
				<view>今日订单</view>
			</view>
			<view>
				<view>0</view>
				<view>今日成交</view>
			</view>
			<view>
				<view>0</view>
				<view>新增会员</view>
			</view>
		</view>
		
		<view class="card">
			<view class="s5">
				<icon type="" class="icon-fire iconfont"></icon>
				<text>订单管理</text>
				<view class="s3 cg fr" @click="toOrderList">全部<icon type="" class="icon-fire iconfont"></icon></view>
			</view>
			<view class="dd item-3" style="margin-top: 30upx;">
				<view class="item-list">
					<image src="../../static/img/pic/logo.png" mode=""></image>
					<view>待发货</view>
					<view class="cg s3"><text class="cr">2</text>单</view>
				</view>
				<view class="item-list">
					<image src="../../static/img/pic/logo.png" mode=""></image>
					<view>待付款</view>
					<view class="cg s3"><text class="cr">2</text>笔</view>
				</view>
				<view class="item-list">
					<image src="../../static/img/pic/logo.png" mode=""></image>
					<view>维权订单</view>
					<view class="cg s3"><text class="cr">2</text>笔</view>
				</view>
			</view>
		</view>
		
		
		<view class="card" style="margin-top: 20upx;">
			<view class="s5">
				<icon type="" class="icon-fire iconfont"></icon>
				<text>商城管理</text>
				<view class="s3 cg fr">全部<icon type="" class="icon-fire iconfont"></icon></view>
			</view>
			<view class="dd item-3" style="margin-top: 30upx;">
				<view class="item-list" @click="toGoods">
					<image src="../../static/img/pic/logo.png" mode=""></image>
					<view>商品管理</view>
					<view class="cg s3"><text class="cr">2</text>个</view>
				</view>
				<view class="item-list">
					<image src="../../static/img/pic/logo.png" mode=""></image>
					<view>会员管理</view>
					<view class="cg s3"><text class="cr">222</text>个</view>
				</view>
				<view class="item-list">
					<image src="../../static/img/pic/logo.png" mode=""></image>
					<view>财务管理</view>
				</view>
			</view>
		</view>
		
		<view class="s3 cg" style="text-align: center;margin: 20upx 0;">更多设置请到PC端后台</view>
	</view>
</template>

<script>
	export default{
		mounted(){
			console.log('operation mounted')
		},
		onShow(){
			console.log('operation show')
		},
		methods:{
			toOrderList(){
				uni.navigateTo({
					url:'./operating/orderList'
				})
			},
			toSetting(){
				uni.navigateTo({
					url:'./operating/setting'
				})
			},
			toGoods(){
				uni.navigateTo({
					url:'./operating/goods'
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
		background: linear-gradient(to right,#fbd8d8,#febab4);
		padding: 20upx 10upx;
	}
	.headface{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		vertical-align: middle;
		margin: 20upx 30upx 10upx 30upx;
	}
	.headface+text{
		display: inline-block;
		vertical-align: middle;
	}
	.bgw{
		background-color: #fff;
	}
	.item-3>view{
		text-align: center;
		display: inline-block;
		vertical-align: top;
		width: 33%;
		margin: 25upx 0;
	}
	.item-3-t{
		margin: 20upx 0;
	}
	.item-3-t>view:not(:last-child){
		border-right: 1px solid #f3f3f3;
	}
	
	
	.card{
		padding: 30upx;
		background-color: #fff;
	}
	.card .fr{
			display: inline-block;
			vertical-align: middle;
			margin-top: 5upx;
		}
		.card .fr icon{
			margin-left: 20upx;
		}
		
		.item-list{
			text-align: center;
			margin-top: 60upx;
			display: inline-block;
			vertical-align: top;
		}
		
		.item-list view{
			white-space: nowrap;
			font-size: 24upx;
			color: #696969;
		}
		.dd .item-list:last-child{
			margin-right: 0;
		}
		 .item-list image{
			width: 80upx;
			height: 80upx;
			margin-bottom: 20upx;
		}
		.top .set{
			text-align: right;
			float: right;
			margin-left: 10upx;
		}
</style>
