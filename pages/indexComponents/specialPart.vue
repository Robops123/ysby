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
</script>

<style>
</style>
