<template>
	<view>
		<view class="padding" v-show="merchModelStatus==1">
			<view class="card card2">
				<text>附近商家</text>
				<view class="fr s3 more" style="margin-top: 6upx;" @click="toDiscover">聚集知名店铺
					<icon class="iconfont icon-arrow-right1" type="" size='14' />
				</view>
			</view>
		</view>
		<view v-show="merchModelStatus==1">
			<view class="sp-item3" v-for="(item,index) in businessList" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image :src="item.logo" mode="" class="headface"></image>
					</view>
					<view>
						<view class="sp-item3-top-middle ellipsis">{{item.merchname}}</view>
						<view>
							<uni-rate disabled="true" size="12" :value="item.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg collectnum">{{item.collect}}人关注
								<text class="s2" v-if="lng && lat"> | 距离{{item.distance < 10 ? (item.distance * 1000)+'米' : item.distance+'千米'}}</text>
							</text>
						</view>
					</view>
					<view class="enter-button" @click="toShop(item.id)">进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view class="" v-for="(childItem,childIndex) in item.goods" :key='childIndex' @click="toGoodsDetail(childItem.goodsid,item.id)">
						<image :src="childItem.thumb" mode=""></image>
						<view class="price">￥{{childItem.marketprice}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate"
	export default{
		props:['businessList','merchModelStatus','lng','lat','logined','uid','token'],
		components:{
			uniRate
		},
		data(){
			return {
				
			}
		},
		mounted(){
			
		},
		methods:{
			// 聚集知名店铺
			toDiscover() {
				uni.switchTab({
					url: './discover'
				})
			},
			toShop(id) {
				uni.navigateTo({
					url: `/pages/bussiness/shopPreview?id=${id}`
				})
			},
			toGoodsDetail(goodsid, merchid) {
				uni.navigateTo({
					url: '/pages/index/goodsDetail?id=' + goodsid + '&merchId=' + merchid
				})
			},
		}
	}
</script>

<style>
	.card {
		padding: 10upx 8upx;
		margin: 15upx 0;
	}
	.card2 {
		background-color: #fdf2f6;
		border-radius: 8upx;
		padding: 10upx 18upx;
		margin-bottom: 0;
	}
	
	.sp-item3:last-child .sp-item3-bottom {
		border-bottom: 50upx solid #f6f1f3;
	}
	
	.sp-item3-top {
		padding: 0 30upx;
		margin: 20upx 0;
	}
	
	.sp-item3-top .headface {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin: 0 15upx;
	}
	
	.sp-item3-top-middle {
		max-width: 400upx;
	}
	
	.sp-item3-top-middle image {
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	
	.sp-item3-top-middle text text {
		color: #a9a9a9;
		margin-left: 10upx;
	}
	
	.sp-item3-top>view {
		display: inline-block;
		vertical-align: top;
	}
	
	.enter-button {
		color: #ff8f94;
		border: 1px solid #ff8f94;
		padding: 6upx 25upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	
	.sp-item3-bottom>view {
		display: inline-block;
		vertical-align: top;
		width: 32%;
		margin-right: 2%;
		height: 220upx;
		position: relative;
		overflow: hidden;
		border-radius: 20upx;
	}
	
	.sp-item3-bottom>view:last-child {
		margin-right: 0;
	}
	
	.sp-item3-bottom {
		padding: 0 30upx;
		/* margin: 0 18upx; */
		display: flex;
		/* justify-content: space-between; */
		border-bottom: 22upx solid #f6f1f3;
		padding-bottom: 22upx;
	}
	
	.sp-item3-bottom image {
		width: 100%;
		height: 100%;
	}
	
	.sp-item3-bottom .price {
		position: absolute;
		left: 0;
		border-radius: 0 20upx 0 20upx;
		bottom: 0;
		color: white;
		padding: 3upx 12upx;
		background-color: #999;
		opacity: 0.8;
		font-size: 24upx;
	}
	.card .more .iconfont {
		margin-left: 10upx;
		font-size: 28upx;
		border-radius: 50%;
		color: #ffb6b9;
		/* background-color: #; */
		vertical-align: bottom;
	}
</style>
