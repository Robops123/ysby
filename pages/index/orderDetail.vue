<template>
	<view style="padding-bottom: 110upx;">
		<view class="top">
			<view>
				<view class="process">卖家已发货</view>
			</view>
			<image src="../../static/img/bg/activity.png" mode=""></image>
		</view>
		<view class="about padding margin bgwhite">
			<view class="icon-fire iconfont"></view>
			<view class="s3">
				<view>羞涩地说  12321312312312</view>
				<view style="margin-top: 10upx;">北京市还定去超大号速度100</view>
			</view>
		</view>
		
		<view class="child-overall-item padding bgwhite">
			<image src="../../static/img/bg/activity.png" mode=""></image>
			<view class="info">
				<view>
					<view class="s2 title">
						儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
						童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
					</view>
					<view class="s3 cg options">
						海蓝色；24(155/60A)<icon type="" class="icon-fire iconfont"></icon>
					</view>
				</view>
				<view class="s3" style="text-align: right;">
					<view class="">$45.00</view>
					<view class=" cg">*1</view>
				</view>
			</view>
		</view>
		
		<view class="padding bgwhite margin">
				<view class="" @click="toFee">
					<text class="">报名费小计</text>
					<text class="fr">1600元</text>
				</view>
				<view class="margin">
					<text class="">推广积分</text>
					<text class="fr">1600元</text>
				</view>
				<view class="margin" @click="toPromoteFee">
					<text class="">报名费小计</text>
					<text class="fr">1600元</text>
				</view>
		</view>
		<view class="padding bgwhite">
				<view class="">
					<text class="pre">提交时间: </text>
					<text class=""> 2020-02-12 10:07:23</text>
				</view>
				<view class="">
					<text class="pre">开始时间: </text>
					<text class=""> 2020-02-12 10:07:23</text>
				</view>
				<view class="">
					<text class="pre">截至时间: </text>
					<text class=""> 2020-02-12 10:07:23</text>
				</view>
		</view>
		<view class="btn-box bgwhite" >
			<button type="default" class="btn" @click="to('drawback')">申请退款</button>
			<button type="default" class="btn">确认收货</button>
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
					url:'/pages/drawback/chooseWay'
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
	}
	.bgwhite{
		background-color: #fff;
	}
	.about>.iconfont{
		margin-right: 30upx;
	}
	.about>view{
		display: inline-block;
		vertical-align: middle;
	}
	.child-overall-item,
	.overall{
		display: flex;
		justify-items: center;
	}
	.child-overall-item>image{
		width: 150upx;
		height: 150upx;
		margin-right: 20upx;
	}
	.child-overall-item .title{
		margin-top: 10upx;
		width: 360upx;
		height: 64upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.info{
		display: flex;
		flex: 1;
		justify-content: space-between;
	}
	.options{
		margin: 25upx 0 0;
	}
	.pre{
		margin-right: 20upx;
	}
	.btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx 30upx 20upx 0;
		text-align: right;
		box-sizing: border-box;
	}
	.btn{
		width: 220upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		border: 1px solid #e0e0e0 !important;
		font-size: 30upx;
		display: inline-block;
		margin-left: 40upx;
		border-radius: 70upx;
		background-color: #fff !important;
	}
</style>
