<template>
	<view class="padding">
		<!-- 类型 -->
		<view class="list ">
			<view class="list-item" v-for="(item,index) in productList" :key='index' @click="toCategory(item.id,1)">
				<image :src="item.icon" mode=""></image>
				<view class="item-name cg s3">{{item.name}}</view>
			</view>
			<view class="list-item" @click="toCategory()">
				<image src="../../static/img/pic/index/icon4.png" mode=""></image>
				<view class="item-name cg s3">更多分类</view>
			</view>
			<view class="list-item" v-for="(item,index) in brandList" :key='index+10' @click="toCategory(item.id,2)">
				<image :src="item.icon" mode=""></image>
				<view class="item-name cg s3">{{item.name}}</view>
			</view>
		
			<!-- #ifdef APP-PLUS || H5 -->
			<view class="list-item" @click="contact" style="vertical-align: bottom;">
				<image src="../../static/img/pic/index/icon10.png" mode=""></image>
				<view class="item-name cg s3">在线客服</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view class="list-item" style="vertical-align: bottom;">
				<button class="userinfo-btn" open-type="contact">
					<image src="../../static/img/pic/index/icon10.png" mode=""></image>
				</button>
				<view class="item-name cg s3">在线客服</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				productList: [
					// {name:'睡眠用品',type:1,imgUrl:'../../static/img/pic/index/icon6.png'},
					// {name:'出行用品',type:2,imgUrl:'../../static/img/pic/index/icon2.png'},
					// {name:'浴室用品',type:3,imgUrl:'../../static/img/pic/index/icon8.png'},
					// {name:'幼教玩具',type:4,imgUrl:'../../static/img/pic/index/icon7.png'},
					// {name:'哺乳用品',type:5,imgUrl:'../../static/img/pic/index/icon1.png'},
					// {name:'护理用品',type:6,imgUrl:'../../static/img/pic/index/icon5.png'},
					// {name:'服饰鞋帽',type:7,imgUrl:'../../static/img/pic/index/icon3.png'},
					// {name:'孕产用品',type:8,imgUrl:'../../static/img/pic/index/icon9.png'},
					// {name:'更多分类',type:9,imgUrl:'../../static/img/pic/index/icon4.png'},
					// {name:'在线客服',type:10,imgUrl:'../../static/img/pic/index/icon10.png'}
				],
				brandList: [],
			}
		},
		mounted(){
			this.getGoodsCate()
		},
		methods:{
			// 商品分类列表
			getGoodsCate() {
				var that = this,
					url = '&r=api.home.category'
				this.$apiPost(url).then((res) => {
					// that.category=res.data
					this.productList = res.data.slice(0, 4)
					this.getBrandCate()
				})
			},
			getBrandCate() {
				var that = this,
					url = '&r=api.home.brand'
				this.$apiPost(url).then((res) => {
					this.brandList = res.data
				})
			},
			toCategory(t, e) {
				uni.navigateTo({
					url: `/pages/index/goodsCategory?type=${t}&extra=${e}`
				})
			},
			contact() {
				uni.navigateTo({
					url: `/pages/index/webKf`
				})
			},
		}
	}
</script>

<style>
	.list {
		text-align: justify;
		margin-top: 30upx;
	}
	
	.list-item {
		display: inline-block;
		margin: 0 0 26upx 0;
		width: 20%;
		text-align: center;
	}
	
	.list-item:nth-of-type(5n) {
		margin-right: 0;
	}
	
	.list-item image {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
</style>
