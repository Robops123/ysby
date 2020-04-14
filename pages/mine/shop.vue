<template>
	<view class="padding">
		<view class="list" v-for="(item,index) in 7" :key='index'>
			<image src="../../static/img/bg/activity.png" mode="" class="headface"></image>
			<view class="md">
				<view class="s3">小象母婴旗舰店</view>
				<view class="tw">
					<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
					<text class="s3 cg">1429人关注 </text>
				</view>
			</view>
			<image src="../../static/img/pic/diamonds.png" mode="" class="loading fr"></image>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default{
		components:{
			uniRate
		}
	}
</script>

<style>
	.list{
		margin-bottom: 50upx;
	}
	.list>image,
	.list>view{
		display: inline-block;
		vertical-align: middle;
	}
	.tw>image,
	.tw>text{
		
	}
	.tw{
		margin: 30upx 0 -10upx;
	}
	.tw image{
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	.tw text{
		color: #a9a9a9;
		margin-left: 20upx;
	}
	.headface{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		margin-right: 25upx;
	}
	.loading{
		width: 40upx;
		height: 20upx;
		margin-top: 50upx;
	}
</style>
