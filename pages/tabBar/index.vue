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
			
			<special-part></special-part>
			
			<image :src="bannerList[1].thumb" v-if="bannerList[1]" mode="widthFix" @click='toBannerDetail(bannerList[1])' class="banner banner2"></image>
		</view>
		
		

		

		<view class="hot " style="padding-top: 20upx;">
			<view class="hot-title">
				<image src="../../static/img/pic/index/hot.png" mode=""></image>热卖商品
			</view>
			<view class=" sp2" style="margin-bottom: 0;padding:20upx 20upx 0 20upx;background: #f3f3f3;">
				<view class="sp-item2 list" style="margin-top: 0;margin-bottom: 20upx;" v-for="(item,index) in hotList" :key='index'
				 @click="toDetail(item.id)">
					<image :src="item.thumb" mode=""></image>
					<view class=" ellipsis" style="padding-left: 20upx;">{{item.title}}</view>
					<view class="cr s5 word-bottom" style="padding: 5upx 20upx  20upx ;box-sizing: border-box;">
						<text><text class="s3">￥</text>{{item.marketprice}}</text>
						<view class="buy fr">
							<image src="../../static/img/pic/cart.png" mode="" @click.stop="getCategory(item.id,item.thumb,item.marketprice)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<image :src="bannerList[2].thumb" v-if="bannerList[2]" style="margin-top: 0;" @click='toBannerDetail(bannerList[2])'
		 mode="widthFix" class="banner banner2"></image>

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
					<!-- <view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view> -->
				</view>
			</view>
		</view>
		<!-- <uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate> -->


		<!-- 规格 -->
		<sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='defaultImg' :defaultPrice='defaultPrice'
		 :category='category' :total='total' v-if="receivedCategory" :goodsid='id'></sku>

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
	
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	import amap from '@/common/amap-wx.js';
	import sku from '@/components/sku/pages/sku.vue'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {
			navBar,
			indexSwiper,
			announcement,
			menus,
			specialPart,
			uniRate,
			uniStatusBar,
			sku,
			uniBadge
		},
		data() {
			return {
				mediaContext: '',
				merchModelStatus: 0,
				nickName: 'aa',
				avatarUrl: '',
				defaultPrice: 0,
				defaultImg: '',
				id: '',
				category: [],
				receivedCategory: false,
				total: 0,
				logined: false,
				uid: '',
				token: '',
				located: true,
				city: '',
				hotList: [],
				
				bannerList: [],
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
			this.getHotList()
			this.getBanner()
			this.getNearbyBusiness()
			

		},
		methods: {
			// 聚集知名店铺
			toDiscover() {
				uni.switchTab({
					url: './discover'
				})
			},
			// 热卖商品
			getHotList(p) {
				var that = this
				var url = '&r=api.home.goods.hotsale'
				this.$apiPost(url).then((res) => {
					that.hotList = res.data.category
				}).catch((err) => {
					this.$msg(err)
				})
			},
			
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
				}).catch((err) => {
					this.$msg(err)
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
			// 
			getCategory(id, img, price) {
				var ce = this.$operateInterceptor(this.logined)
				if (!ce) {
					return;
				}
				this.defaultImg = img
				this.defaultPrice = price.split(' - ')[0]
				this.$loading()
				this.id = id
				var that = this
				var url = '&r=api.goods.detail.sku&goodsid=' + id
				this.$apiPost(url).then((res) => {
					that.category = res.data
					that.total = res.stock
					// if(res.resultMessage=='暂无数据'){
					// 	that.needCategory=false
					// }else{
					// 	that.needCategory=true
					// }
					that.receivedCategory = true
					that.$nextTick(function() {
						that.$refs.sku.specClass = 'show'
						uni.hideLoading()
					})
				})
			},
			completeSpecChoose(e) {
				this.addCollect(this.id, e.choosedid.join(','), e.selectArr)
				this.receivedCategory = false
			},
			addCollect(id, skuidsort, specifications) {
				this.$loading()
				var that = this
				var params = {
					uid: this.uid,
					token: this.token,
					goodsid: id,
					specifications: specifications,
					skuidsort: skuidsort
				}
				var url = '&r=api.member.cart.add'
				this.$apiPost(url, params).then((res) => {
					// that.options[2].info++
					uni.hideLoading()
					that.$msg('添加成功')
				})
			},

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




	

	

	
	

	.hot {
		text-align: center;
	}

	.hot .hot-title,
	.hot .hot-title::before,
	.hot .hot-title::after {
		display: inline-block;
		vertical-align: middle;
	}

	.hot .hot-title::before {
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-right: 30upx;
	}

	.hot .hot-title::after {
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-left: 30upx;
	}

	.hot-title image {
		width: 30upx;
		height: 30upx;
		margin-right: 18upx;
	}

	.sp2 {
		text-align: justify;
		margin: 40upx 0 20upx;
	}

	.sp2 .sp-item2 {
		background: #FFF;
		width: 49%;
		display: inline-block;
		/* margin-bottom: 15upx; */
	}

	.sp2 .sp-item2:nth-of-type(odd) {
		margin-right: 2%;
	}

	.sp2 .sp-item2 view {
		/* margin-bottom: 20upx; */
	}

	.sp2 image {
		/* margin-bottom: 10upx; */
		width: 100%;
		height: 350upx;
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


	.buy image {
		width: 55upx;
		height: 55upx;
		padding: 10upx;
		margin-top: -15upx;
	}

	.word-bottom>view {
		display: inline-block;
		vertical-align: middle;
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
