<template>
	<view class="padding" >
		<view class="card card1">
			<view style="padding:0  2%;">
				<text>每日特价</text>
				<view class="fr s3 more" style="margin-top: 4upx;" @click="toGoodsList(activityData.id,activityData.title)">{{activityData.title}}
					<icon class="iconfont icon-arrow-right1" type="" size='14' />
				</view>
			</view>
			<view class="sp">
				<view class="sp-item" v-for="(item,index) in bargainList" :key='index' @click="toDetail(item.id)">
					<image :src="item.thumb" mode=""></image>
					<view class="s3 ellipsis">{{item.title}}</view>
					<view class="cr s3">￥{{item.marketprice}}</view>
					<view class="cg s2 del">￥{{item.productprice}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bargainList: [],
				activityData: {}
			}
		},
		mounted(){
			this.getBargain()
			this.getActivity()
		},
		methods:{
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/index/goodsDetail?id=${id}`
				})
			},
			toGoodsList(id, title) {
				uni.navigateTo({
					url: `/pages/index/goodsList?id=${id}&title=${title}`
				})
			},
			// 热卖
			getBargain() {
				var that = this
				var url = '&r=api.home.goods.bargain'
				this.$apiPost(url).then((res) => {
					that.bargainList = res.data
				}).catch((err) => {
					this.$msg(err)
				})
			},
			// 限时活动
			getActivity() {
				var that = this
				var url = '&r=api.home.activity'
				this.$apiPost(url).then((res) => {
					that.activityData = res.data[0]
					// that.bargainList=res.data
				}).catch((err) => {
					this.$msg(err)
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
	
	.card1 {
		background-color: #fff7f5;
	}
	
	.card .more .iconfont {
		margin-left: 10upx;
		font-size: 28upx;
		border-radius: 50%;
		color: #ffb6b9;
		/* background-color: #; */
		vertical-align: bottom;
	}
	.sp-item image {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}
	
	.sp-item {
		margin: 8upx 0 10upx 2%;
		display: inline-block;
		vertical-align: top;
		width: 31%;
		/* pad */
	}
	
	..sp-item:last-child {
		margin-right: 0;
	}
	
	.sp-item .ellipsis {
		width: 200upx;
	}
	
	.sp-item:last-child {
		margin-right: 0;
	}
</style>
