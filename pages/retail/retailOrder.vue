<template>
	<view>
		<view class="distributionOrder" >
			<view class="distributionOrder-title">累计金额:+23.20元</view>
			<view class="distributionOrder-card"  v-for='(item,index) in 3' :key='index' @click="to('myTeam')">
				<image class="distributionOrder-card-img" src="" mode=""></image>
				<view class="distributionOrder-card-title">中达花无缺</view>
				<view class="distributionOrder-card-zhuangtai cr">已完成</view>
				<view style="clear: both;"></view>
				<view class="distributionOrder-card-code">订单编号:DFGHH5588644592148956</view>
				<view class="distributionOrder-card-code distributionOrder-card-codes">下单时间：2020-02-11 12:12</view>
				<view class="distributionOrder-card-bot">
						<text class="distributionOrder-card-bot-tishi">订单金额:</text>
						<text class="distributionOrder-card-bot-price">12.20</text>
						<text class="distributionOrder-card-bot-tishi margin-left">获得佣金:+</text>
						<text class="distributionOrder-card-bot-price">12.20</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			distributionOrderdetail(){
				uni.navigateTo({
					url:'/pages/distributionOrderdetail/distributionOrderdetail'
				})
			},
			to(where){
				uni.navigateTo({
					url:`/pages/retail/${where}`
				})
			}
		}
	}
</script>

<style>
page{
	background-color:#f3f3f3;
}
.distributionOrder-title{
	width: 750upx;
	height: 90upx;
	line-height: 90upx;
	background: linear-gradient(to right,#ff9da1,#ff7076);
	font-family: PingFang-SC-Regular;
	font-size: 28upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;	
	margin-top: 20upx;
	text-indent:23upx;
}
.distributionOrder-card{
	width: 750upx;
	background-color: #FFFFFF;
	margin-top: 20upx;
}
.distributionOrder-card-img{
	width: 57upx;
	height: 57upx;
	float: left;
	margin: 16upx 23upx 0;
	border-radius: 50%;
	background-color: #007AFF;
}
.distributionOrder-card-title{
	width: 530upx;
	height: 57upx;
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 57upx;
	color: #2f2f2f;
	float: left;
	margin-top: 16upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.distributionOrder-card-zhuangtai{
	height: 57upx;
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 57upx;
	float: right;
	text-align: center;
	margin: 16upx 28upx 0 0;
}
.distributionOrder-card-code{
	width: 700upx;
	font-family: PingFang-SC-Regular;
	font-size: 20upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #888888;
	margin: 41upx auto 0;
}
.distributionOrder-card-codes{
	margin: 18upx auto 0;
}
.distributionOrder-card-bot{
	width: 750upx;
	text-align: right;
	border-top: 2upx solid #ededed;
	margin-top: 28upx;
}
.distributionOrder-card-bot-price{
	display: inline-block;
	height: 100%;
	font-family: PingFang-SC-Regular;
	font-size: 30upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 76upx;
	letter-spacing: 2upx;
	color: #181818;
	margin-right: 20upx;
}
.distributionOrder-card-bot-tishi{
	display: inline-block;
	height: 100%;
	font-family: PingFang-SC-Regular;
	font-size: 20upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 80upx;
	letter-spacing: 2upx;
	color: #3f3f3f;
}
.margin-left{
	margin-left: 20upx;
}
</style>
