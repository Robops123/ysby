<template>
	<view>
		<!-- 导航 -->
		<nav-bar :located='located' :city='city' @relocate='getNearbyBusiness' :logined='logined' :uid='uid' :token='token'></nav-bar>

		<!-- 列表 -->
		<view class="main">
			<!-- 轮播 -->
			<index-swiper></index-swiper>
			
			<!-- 公告 -->
			<announcement></announcement>
			
			<!-- 菜单 -->
			<menus></menus>
			
			<image :src="bannerList[0].thumb" v-if="bannerList[0]" mode="widthFix" @click='toBannerDetail(bannerList[0])' class="banner banner2 "></image>
			
			<!-- 特价 -->
			<special-part></special-part>
			
			<image :src="bannerList[1].thumb" v-if="bannerList[1]" mode="widthFix" @click='toBannerDetail(bannerList[1])' class="banner banner2"></image>
			
			<!-- 热卖 -->
			<hot-sale :logined='logined' :uid='uid' :token='token'></hot-sale>
			
			<image :src="bannerList[2].thumb" v-if="bannerList[2]" @click='toBannerDetail(bannerList[2])' mode="widthFix" class="banner banner2"></image>
			
			<!-- 附近商家 -->
			<nearby-merch :logined='logined' :uid='uid' :token='token' v-show="businessListReady" :lng='lng' :lat='lat'
			:businessList='businessList' :merchModelStatus='merchModelStatus'></nearby-merch>
		</view>

		
		<!-- <uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate> -->


		

		<!-- <audio></audio> -->
	</view>
</template>

<script>
	// 拆分
	import navBar from '@/pages/indexComponents/navBar.vue'
	import indexSwiper from '@/pages/indexComponents/swiper.vue'
	import announcement from '@/pages/indexComponents/announcement.vue'
	import menus from '@/pages/indexComponents/menus.vue'
	import specialPart from '@/pages/indexComponents/specialPart.vue'
	import hotSale from '@/pages/indexComponents/hotSale.vue'
	import nearbyMerch from '@/pages/indexComponents/nearbyMerch.vue'
	
	
	import amap from '@/common/amap-wx.js';
	export default {
		components: {
			navBar,
			indexSwiper,
			announcement,
			menus,
			specialPart,
			hotSale,
			nearbyMerch
		},
		data() {
			return {
				mediaContext: '',
				merchModelStatus: 0,
				nickName: 'aa',
				avatarUrl: '',
				logined: false,
				uid: '',
				token: '',
				located: true,
				city: '',
				bannerList: [],
				businessListReady:false,
				businessList: [],
				lng: '',
				lat: '',
				amapPlugin: null,
				key: '364f9609be0c585e1d79d1c6f5ca4faf',
			}
		},
		// watch:{
		// 	lng(n){
		// 		if(n){

		// 		}
		// 	}
		// },
		onShow() {
			var userInfo = uni.getStorageSync('userInfo')
			if (userInfo != '' & userInfo != null & userInfo != undefined) {
				this.logined = true
				this.uid = userInfo.uid
				this.token = userInfo.token
				// this.msgListener()
			} else {
				this.logined = false
			}

		},
		mounted() {
			// uni.clearStorageSync()
			// uni.setStorageSync('member',[{name:'cd82566fd157be7887d7ca6cb646575d'}])
			var that = this
			uni.$on('logined', function() {
				var userInfo2 = uni.getStorageSync('userInfo')
				that.logined = true
				that.uid = userInfo2.uid
				that.token = userInfo2.token
				// that.msgListener()
			})
			// #ifdef MP
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.wdnmd()
			// #endif
			// #ifdef APP-PLUS || H5
			this.merchModelStatus = Number(1)
			// #endif
			this.getBanner()
			this.getNearbyBusiness()
			

		},
		methods: {
			// 广告图
			getBanner() {
				var that = this
				var url = '&r=api.home.adv'
				this.$apiPost(url).then((res) => {
					that.bannerList = res.data
				}).catch((err) => {
					this.$msg(err)
				})
			},
			// 小程序绕开审核
			wdnmd() {
				var that = this
				var url = '&r=api.mo'
				this.$apiPost(url).then((res) => {
					that.merchModelStatus = Number(res.data.status)
				}).catch((err) => {
					this.$msg(err)
				})
			},

			getNearbyBusiness() {
				// #ifdef APP-PLUS || H5
				this.appLocate()
				// #endif
				// #ifdef MP-WEIXIN
				this.mpLocate()
				// #endif
			},
			mpLocate() {
				var that = this
				console.log('mplocate')
				this.amapPlugin.getRegeo({
					success: (res) => {
						that.city = res[0].regeocodeData.addressComponent.city
						that.lng = res[0].longitude
						that.lat = res[0].latitude
						var params = {
							longitude: res[0].longitude,
							latitude: res[0].latitude
						}
						that.located = true
						that.getNearBy(params)
					},
					fail: (reason) => {
						console.log(reason)
						that.located = false
						that.getNearBy({})
						that.$msg('请打开定位功能')
					}
				});
			},
			appLocate() {
				var that = this
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						that.city = res.address.city
						that.lng = res.longitude
						that.lat = res.latitude
						that.located = true
						that.getNearBy(res)
					},
					fail: (reason) => {
						that.located = false
						that.getNearBy({})
						that.$msg('请打开定位功能')
					}
				})
			},
			getNearBy(res) {
				var url = '&r=api.home.merchant'
				var params = {
						lng: res.longitude || '',
						lat: res.latitude || ''
					},
					that = this
				this.$apiPost(url, params).then((res) => {
					that.businessList = res.data.map((item) => {
						item.distance = parseInt(item.distance)
						return item
					})
					that.businessListReady=true
				}).catch((err) => {
					this.$msg(err)
				})
			},
			
			// 
			

			noticeChange(e) {
				console.log(e)
			},

		}
	}
</script>

<style>
	.main {
		padding-top: 84upx;
	}
	
	.padding+.padding{
		padding-top: 0;
	}
	
	.banner {
		border-radius: 10upx;
		width: 100%;
	}

	.banner2 {
		/* margin: 10upx 0 20upx; */
		border-radius: 0 !important;
	}
	

	

	/* 联系客服 */
	.userinfo-btn:before,
	.userinfo-btn:after {
		display: none;
	}

	.userinfo-btn {
		display: inline-block;
		background: none;
		padding: 0 !important;
		border: none;
		outline: none;
		width: 90upx;
		height: 90upx;
		margin: 0 auto;
		text-align: center;
	}
</style>
