<template>
	<view >
		<!-- <view class="top-nav padding">
			<view class="nav-content">
				<text class="iconfont icon-previewleft " @click="back"></text>
				<text>代理佣金</text>
				<text class="cg fr s2" >提现明细</text>
			</view>
		</view> -->
		
		<view class="main">
			<view class="recommendAward-card">
				<image class="recommendAward-card-img1" src="../../static/img/pic/proxy/icon7.png" mode=""></image>
				<view class="recommendAward-card-left">可提现金额</view>
				<view class="recommendAward-card-right">23.20元</view>
			</view>
			<view class="recommendAward-card">
				<image class="recommendAward-card-img2" src="../../static/img/pic/proxy/icon8.png" mode=""></image>
				<view class="recommendAward-card-left">已申请金额</view>
				<view class="recommendAward-card-right recommendAward-card-rights">0.00元</view>
			</view>
			<view class="recommendAward-card">
				<image class="recommendAward-card-img3" src="../../static/img/pic/proxy/icon1.png" mode=""></image>
				<view class="recommendAward-card-left">成功提现金额</view>
				<view class="recommendAward-card-right recommendAward-card-rights">0.00元</view>
			</view>
			<view style="width: 750upx;height: 20upx;background-color: #f3f3f3;"></view>
			<view class="recommendAward-info" @click="isshowinfo=!isshowinfo">
				<view class="recommendAward-info-txt">用户须知</view>
			</view>
			<view class="showinfo" v-if="isshowinfo">
				<view class="showinfo-card">买家订单完成后，立即获得推荐奖励</view>
				<view class="showinfo-card showinfo-cards">友情提示:可用金额满<text>1</text>元后可能申请提现</view>
			</view>
			<view class="recommendAward-info-btn" >我要提现</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshowinfo:true,
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			to(where){
				uni.navigateTo({
					url:`./${where}`
				})
			}
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
		/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
		/* #endif */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.nav-content{
		width: 100%;
		/* #ifdef APP-PLUS */
		display: flex;
		/* #endif */
		text-align: right;
		align-items: center;
		justify-content: space-between;
	}
	
	page{
			background-color: #fff;
		}
		.main{
			border-top: 20upx solid #f3f3f3;
			/* margin-top: 86upx; */
		}
	.recommendAward-set{
		width: 750upx;
		height: 45upx;
		margin-top: 71upx;
	}
	.recommendAward-set-back{
		width: 21upx;
		height: 37upx;
		margin: 4upx 0 0 24upx;
		float: left;
	}
	.recommendAward-set-title{
		width: 120upx;
		height: 100%;
		line-height: 45upx;
		font-family: PingFang-SC-Regular;
		font-size: 30upx;
		font-weight: normal;
		font-stretch: normal;
		color: #000000;
		float: left;
		margin-left: 270upx;
	}
	.recommendAward-set-right{
		width: 112upx;
		height: 100%;
		line-height: 45upx;
		font-family: PingFang-SC-Regular;
		font-size: 28upx;
		font-weight: normal;
		font-stretch: normal;
		color: #919191;
		float: left;
		margin-left: 150upx;
	}
	.recommendAward-card{
		width: 706upx;
		height: 90upx;
		margin: 0 auto;
		border-bottom: 2upx solid #f0f0f0;
	}
	.recommendAward-card-img1{
		width: 34upx;
		height: 34upx;
		float: left;
		margin: 28upx 12upx 0 25upx;
	}
	.recommendAward-card-img2{
		width: 33upx;
		height: 33upx;
		float: left;
		margin: 28upx 12upx 0 24upx;
	}
	.recommendAward-card-img3{
		width: 31upx;
		height: 30upx;
		float: left;
		margin: 30upx 13upx 0 26upx;
	}
	.recommendAward-card-left{
		height: 100%;
		line-height: 90upx;
		font-family: PingFang-SC-Regular;
		font-size: 26upx;
		font-weight: normal;
		font-stretch: normal;
		color: #575757;
		float: left;
	}
	.recommendAward-card-right{
		height: 100%;
		line-height: 90upx;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		font-weight: normal;
		font-stretch: normal;
		color: #f82a2a;
		float: right;
	}
	.recommendAward-card-rights{
		color: #000000;
	}
	.recommendAward-info{
		width: 706upx;
		height: 80upx;
		border-bottom: 2upx solid #f0f0f0;
		margin: 0 auto;
	}
	.recommendAward-info-txt{
		height: 100%;
		line-height: 70upx;
		font-family: PingFang-SC-Regular;
		font-size: 26upx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 1px;
		color: #000000;
		float: left;
		margin-left: 4upx;
	}
	.recommendAward-info-img{
		width: 26upx;
		height: 15upx;
		float: right;
		margin: 36upx 5upx 0 0;
	}
	.showinfo-card{
		width: 706upx;
		font-family: PingFang-SC-Regular;
		font-size: 26upx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 1upx;
		color: #575757;
		margin: 22upx auto 0;
	}
	.showinfo-cards{
		margin: 8upx auto 0;
	}
	.showinfo-cards text{
		color: #f82a2a;
	}
	.recommendAward-info-btn{
		width: 80%;
		margin: 0 auto;
		height: 90upx;
		border-radius: 90upx;
		background-color: #ff6d7e;
		line-height: 90upx;
		margin-top: 100upx;
		text-align: center;
		font-family: PingFang-SC-Regular;
		font-size: 30upx;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
	}
</style>
