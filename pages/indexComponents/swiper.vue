<template>
	<view class="padding">
		<swiper class="swiper" style='border-radius: 8px;'  autoplay="false"  duration="500"  interval="3000"
		 :indicator-dots='true' indicator-active-color='#ff6d7e' indicator-color='#fff'>
			    <swiper-item v-for="(item, index) in carouselList" class="swiper-item"  :key="index" @click='toBannerDetail(item)'>
				     <image :src="item.thumb" mode=""></image>
				    </swiper-item>
			   </swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				carouselList:[]
			}
		},
		mounted(){
			this.getCarsouselList()
		},
		methods:{
			// 轮播图
			getCarsouselList(p) {
				var that = this
				var url = '&r=api.home.banner'
				this.$apiPost(url).then((res) => {
					that.carouselList = res.data
				}).catch((err) => {
					this.$msg(err)
				})
			},
			// 轮播链接
			toBannerDetail(item) {
				console.log(item)
				switch (item.type) {
					case '1':
						uni.navigateTo({
							url: `/pages/index/bannerDetail?url=` + encodeURIComponent(item.link)
						})
						break;
					case '2':
						uni.navigateTo({
							url: `/pages/index/goodsDetail?id=` + item.goodsid
						})
						break;
					case '3':
						uni.navigateTo({
							url: `/pages/bussiness/shopPreview?id=` + item.merchid
						})
						break;
				}
			
			},
		}
	}
</script>

<style>
	.swiper {
		/* #ifdef APP-PLUS */
		margin-top: 76upx;
		/* #endif */
		height: 150px;
	}
	
	.swiper-item {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		/* height: 600upx !important; */
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
	
</style>
