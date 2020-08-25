<template>
	<view>
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
		
		<!-- 规格 -->
		<sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='defaultImg' :defaultPrice='defaultPrice'
		 :category='category' :total='total' v-if="receivedCategory" :goodsid='id'></sku>
	</view>
</template>

<script>
	import sku from '@/components/sku/pages/sku.vue'
	export default{
		props:['logined','uid','token'],
		components:{
			sku
		},
		data(){
			return {
				hotList: [],
				defaultPrice: 0,
				defaultImg: '',
				id: '',
				category: [],
				receivedCategory: false,
				total: 0,
			}
		},
		mounted(){
			this.getHotList()
		},
		methods:{
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
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/index/goodsDetail?id=${id}`
				})
			},
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
		}
	}
</script>

<style>
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
</style>
