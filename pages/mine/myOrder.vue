<template>
	<view>
		<view class="nav-bar" >
			<scroll-view class="" style="white-space: nowrap;height: 68upx;" scroll-x :scroll-left="margin" >
				<view class="nav nav-left" :class="{active:active==0}" @click="toggle($event,0)" id='id0' data-distance='0'><text>全部</text></view>
				<view class="nav nav-right" :class="{active:active==1}" @click="toggle($event,1)" id='id1' data-distance='0'><text>待付款</text></view>
				<view class="nav nav-left" :class="{active:active==2}" @click="toggle($event,2)" id='id2' data-distance='0'><text>待发货</text></view>
				<view class="nav nav-right" :class="{active:active==3}" @click="toggle($event,3)" id='id3' data-distance='60'><text>待收货</text></view>
				<!-- <view class="nav nav-right" :class="{active:active==5}" @click="toggle($event,5)" id='id5' data-distance='120'><text>待评价</text></view> -->
				<view class="nav nav-left" :class="{active:active==6}" @click="toggle($event,6)" id='id6' data-distance='180'><text>已完成</text></view>
				<view class="nav nav-left" :class="{active:active=='qx'}" @click="toggle($event,'qx')" id='id11' data-distance='240'><text>订单取消</text></view>
				<view class="nav nav-left" :class="{active:active=='sh'}" @click="toggle($event,'sh')" id='id99' data-distance='240'><text>售后</text></view>
			</scroll-view>
		</view>
		<view class="padding">
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}" @scrolltolower='toBottom'>
				<view class="card" v-for="(item,index) in dataList" :key='index'>

					<view v-for="(item2,index2) in item.goods" :key='index2' v-if='item2.goodsdata.length>0'>
						<view class="overall">
							<view @click.stop="toShop(item2.merchid)">
								<icon type="" class="icon-iconfontshop-copy iconfont"></icon>
								<text class="overall-title">{{item2.merchname}}</text>
								<text class="icon-arrow-right iconfont"></text>
							</view>
							<text class="fr cr s2" v-show='item.status==1'>待付款</text>
							<text class="fr cr s2" v-show='item.status==2'>待发货</text>
							<text class="fr cr s2" v-show='item.status==3'>待收货</text>
							<text class="fr cr s2" v-show='item.status==5'>待评价</text>
							<text class="fr cr s2" v-show='item.status==6'>已完成</text>
						</view>
						<view class="child-overall" v-for="(childItem,childIndex) in item2.goodsdata" :key='childIndex' @click="toOrderDetail(item.orderno,item2.merchid)">
							<view class="child-overall-item" >
								<image :src="childItem.goodspic" mode=""></image>
								<view class="info">
									<view class="s2 title">
										{{childItem.goodsname}}
									</view>
									<view class="s3 cg options ellipsis">
										{{childItem.specifications}}
										<!-- <image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image> -->
									</view>
									<view class="bottom-content">
										<text class="s3 ">共{{childItem.amount}}件商品 合计:<text class="s1">￥{{childItem.goodsprice * childItem.amount}}</text></text>
									</view>
								</view>
								<view class="mount">
									<view class="s3 "><text class="s1">￥{{childItem.goodsprice}}</text></view>
									<view class="s3 cg">*{{childItem.amount}}</view>
								</view>
							</view>
							<view class="btn-box">
								<button type="default" class="btn btn2" v-show='childItem.status==3' @click.stop="confirmReceive(item.orderno,childItem.goodsid)">确认收货</button>
								<button type="default" class="btn btn1" v-show='childItem.status!=3' @click.stop="getCategory(childItem.goodsid,childItem.goodspic,childItem.goodsprice)">加入购物车</button>
								<!-- <button type="default" class="btn btn1" v-show='active==5' @click.stop="toComment(item2,item.orderno)">评价</button> -->
								<button type="default" class="btn btn1" v-show='childItem.status==1' @click.stop="cancelOrder(item.orderno,childItem.goodsid,index)">取消订单</button>
								<button type="default" class="btn btn1" v-show='childItem.status!=1' @click.stop="deleteOrder(item.orderno,childItem.goodsid,index)">删除订单</button>
								<button type="default" class="btn btn2" v-show='childItem.status==1' @click.stop="topay(item2.goodsdata,item.orderno)">去付款</button>
								<button type="default" class="btn btn2" v-show='childItem.status==3' @click.stop="toDrawback(childItem)">申请退款</button>
								<button type="default" class="btn btn2"  @click.stop='tochat(item2.merchid)'>联系卖家</button>
							</view>
						</view>

						<!-- <view class="btn-box">
							<button type="default" class="btn btn1" v-show='active!=4' @click.stop="addCollect(item2.goodsdata)">加入购物车</button>
							<button type="default" class="btn btn1" v-show='active==5' @click="toComment(item)">评价</button>
							<button type="default" class="btn btn1" v-show='active==1' @click="cancelOrder(item.orderno,index)">取消订单</button>
							<button type="default" class="btn btn2" v-show='active==1' @click="topay(item)">去付款</button>
							<button type="default" class="btn btn2" v-show='active!=1' @click="toDrawback(item)">申请退款</button>
							<button type="default" class="btn btn2" v-show='active==2' @click='tochat(item2.merchid)'>联系卖家</button>
						</view> -->
					</view>


				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
		<pop ref='merch'></pop>
		
		<sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='defaultImg' :defaultPrice='defaultPrice'
		:category='category' :total='totalsku' v-if="receivedCategory" :goodsid='id'></sku>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import pop from '@/components/promptOptions/pop'
	import sku from '@/components/sku/pages/sku.vue'
	export default {
		components: {
			uniLoadMore,
			pop,
			sku
		},
		data() {
			return {
				margin:0,
				old:{
					margin:0
				},
				defaultPrice:0,
				defaultImg:'',
				id:'',
				category:[],
				receivedCategory:false,
				totalsku:0,
				uid: '',
				token: '',
				userName:'',
				hx_openid:'',
				hx_pwd:'',
				active: 0,
				cartList: [{

				}],
				sh: '',
				dataList: [],
				page: 1,
				pageSize: 8,
				total: 0,
				more: ''
			}
		},
		onLoad(p) {
			var that = this
			var userInfo = uni.getStorageSync('userInfo'),
				that = this
			// if(p.active!=0){
				console.log(p.margin)
			this.active = p.active
			this.userName=p.userName
			// }
			if (userInfo != '' & userInfo != null & userInfo != undefined) {
				this.uid = userInfo.uid
				this.token = userInfo.token
				this.hx_openid=userInfo.hx_openid
				this.hx_pwd=userInfo.hx_pwd
			}
			this.getList(this.page)
			setTimeout(function() {
				that.$getHeight('#sv', (res) => {
					that.sh = res
				})
			}, 0)
			uni.$on('updateOrder', () => {
				this.reset()
				this.getList(this.page)
			})
			this.$nextTick(() =>{
				this.margin=Number(p.margin)
			})
		},
		computed: {
			noMore() {
				return this.dataList.length >= this.total
			},
		},
		methods: {
			// scroll(e){
			// 	this.old.margin = e.detail.scrollTop
			// },
			async tochat(id) {
				var that = this
				var params = {
					merchid:id,
					uid:this.uid,
					token:this.token
				}
				var url = '&r=api.member.order.contactMerch'
				this.$apiPost(url, params).then((res) => {
					 this.$conn.open({
							apiUrl: this.$im.config.apiURL,
							user: that.hx_openid,
							pwd: that.hx_pwd,
							grant_type: 'password',
							appKey: this.$im.config.appkey
						});
						uni.setStorageSync('myUsername',that.hx_openid)
						var username={
							your:res.data.merch_hx_openid,
							myName:that.hx_openid
						}
					uni.navigateTo({
						url: `/pages/chat/chat?username=${JSON.stringify(username)}&title=${res.data.merchname}`
					})
				})
				
			},
			toDetail() {
				uni.navigateTo({
					url: './myOrderDetail'
				})
			},
			toShop(id) {
				uni.navigateTo({
					url: `/pages/bussiness/shopPreview?id=${id}`
				})
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: `/pages/index/goodsDetail?id=${id}`
				})
			},
			topay(item,orderno) {
				var totalprice=0
				item.forEach((goods) =>{
					totalprice+=Number(goods.amount) * Number(goods.goodsprice)
				})
				uni.navigateTo({
					url: `/pages/index/cashier?orderId=${orderno}&money=${totalprice}`
				})
			},
			toComment(item,orderno) {
				uni.navigateTo({
					url: './myOrderDetail?item=' + JSON.stringify(item)+'&orderno='+orderno
				})
			},
			toDrawback(item) {
				// var goods = []
				// item.goods.forEach((item1) => {
				// 	item1.goodsdata.forEach((item2) => {
				// 		goods.push(item2)
				// 	})
				// })
				uni.navigateTo({
					url: `/pages/drawback/chooseWay?goods=${JSON.stringify(item)}&orderno=${item.orderno}`
				})
			},
			// 订单详情
			toOrderDetail(orderno,id){
				console.log(orderno,id)
				uni.navigateTo({
					url: `../index/orderDetail?orderno=${orderno}&merchid=${id}`
				})
			},
			toggle(e,t) {
				this.active = t
				this.margin=e.currentTarget.dataset.distance
				this.reset()
				this.getList(this.page)
			},
			reset() {
				this.page = 1
				this.total = 0
				this.dataList = []
				this.more = ''
			},
			getList(p) {
				var that = this
				var params = {
					page: p,
					pagesize: this.pageSize,
					uid: this.uid,
					token: this.token,
					status: this.active
				}
				if (this.page == 1) {
					this.$loading()
				}
				var url = '&r=api.member.order'
				this.$apiPost(url, params).then((res) => {
					that.total = res.total
					that.dataList = that.dataList.concat(res.data)
					that.more = ''
					if (that.page == 1) {
						uni.hideLoading()
					}
				})
			},
			toBottom() {
				if (this.noMore) {
					this.more = 'noMore'
					return;
				}
				var that = this
				this.more = 'loading'
				// setTimeout(function(){
				that.page++
				that.getList(that.page)
				// },2000)
			},
			cancelOrder(order, id,from) {
				var that = this
				var params = {
					uid: this.uid,
					token: this.token,
					orderno: order,
					goodsid:id
				}
				var url = '&r=api.member.order.cancel'
				this.$apiPost(url, params).then((res) => {
					this.$msg('取消成功')
					// that.options[2].info++
					setTimeout(() =>{
						this.reset()
						this.getList(this.page)
					},500)
				})
			},
			deleteOrder(order, id,from){
				var that = this
				var params = {
					uid: this.uid,
					token: this.token,
					orderno: order,
					goodsid:id
				}
				var url = '&r=api.member.order.delete'
				this.$apiPost(url, params).then((res) => {
					this.$msg('删除成功')
					// that.options[2].info++
					setTimeout(() =>{
						this.reset()
						this.getList(this.page)
					},500)
				})
			},
			confirmReceive(order,goodsid) {
				var that = this
				var params = {
					uid: this.uid,
					token: this.token,
					orderno: order,
					goodsid:goodsid
				}
				var url = '&r=api.member.order.receive'
				this.$apiPost(url, params).then((res) => {
					this.$msg('确认收货成功')
					setTimeout(() =>{
							this.reset()
							this.getList(this.page)
						uni.navigateTo({
							url:`/pages/mine/myOrderDetail`
						})
					},1000)
					// that.options[2].info++
				})
			},
			getCategory(id,img,price){
				this.defaultImg=img
				this.defaultPrice=price.split(' - ')[0]
				this.$loading()
				this.id=id
							  var that=this
							  var url='&r=api.goods.detail.sku&goodsid='+id
							    this.$apiPost(url).then((res) =>{
										that.category=res.data
										that.totalsku=res.stock
										// if(res.resultMessage=='暂无数据'){
										// 	that.needCategory=false
										// }else{
										// 	that.needCategory=true
										// }
										that.receivedCategory=true
										that.$nextTick(function(){
											that.$refs.sku.specClass='show'
											uni.hideLoading()
										})
							    })
			},
			completeSpecChoose(e){
				this.addCollect(this.id,e.choosedid.join(','),e.selectArr)
				this.receivedCategory=false
			},
			addCollect(id,skuidsort,specifications){
				this.$loading()
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					goodsid:id,
					specifications:specifications,
					skuidsort:skuidsort
				}
				  var url='&r=api.member.cart.add'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
						uni.hideLoading()
										that.$msg('添加成功')
				  })
			},
		}
	}
</script>

<style>
	page {
		background-color: #f3f3f3;
	}

	.nav-bar {
		text-align: center;
		/* padding: 20upx 0; */
		padding:0 ;
		background-color: white;
		width: 100%;
		box-sizing: border-box;
		overflow: auto;
	}

	.nav {
		color: #afafaf;
		display: inline-block;
		width: 160upx;
		box-sizing: border-box;
	}

	.nav.active text {
		color: #000000;
		position: relative;
	}

	.nav.active text::before {
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}

	.card {
		background-color: #fff;
		border-radius: 18upx;
		margin: 20upx 0;
		/* border-top: 20upx solid #; */
	}

	.child-overall,
	.overall {
		padding: 20upx 15upx 0 15upx;
	}

	.child-overall:last-child {
		padding-bottom: 20upx;
	}

	.child-overall-item,
	.overall {
		display: flex;
		justify-items: center;
	}

	.overall {
		padding-right: 20upx;
		align-items: center;
		justify-content: space-between;
	}

	.child-overall-item>image {
		width: 200upx;
		height: 200upx;
		margin-right: 20upx;
		border-radius: 17upx;
	}

	.child-overall-item {
		margin-bottom: 20upx;
	}

	.child-overall-item .info {
		width: 320upx;
		/* height: 64upx; */
		overflow: hidden; //一定要写
		text-overflow: ellipsis; //超出省略号
		display: -webkit-box; //一定要写
		-webkit-line-clamp: 2; //控制行数
		-webkit-box-orient: vertical; //一定要写
	}

	.calculator text {
		display: inline-block;
		vertical-align: middle;
	}

	.calculator .calc {
		display: inline-block;
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
		margin: 0 20upx;
		font-size: 36upx;
		line-height: 40upx;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #e8e8e8;
	}

	.info {
		position: relative;
	}

	.options {
		background-color: #f9f9f9;
		display: inline-block;
		padding: 5upx 16upx;
		border-radius: 24upx;
		margin-top: 15upx;
	}

	.mount {
		flex: 1;
		margin-left: 15upx;
		text-align: right;
		padding-top: 20upx;
	}

	.btn-box {
		text-align: right;
		padding-right: 25upx;
		/* padding-bottom: 20upx; */
		margin: 35upx 0 15upx;
		/* overflow-x: auto;
		white-space: nowrap; */
	}

	.btn {
		/* width: 28%; */
		height: 66upx;
		border-radius: 66upx;
		line-height: 66upx !important;
		text-align: center;
		color: white;
		font-size: 28upx;
		padding: 0 15upx !important;
		display: inline-block;
		background-color: white !important;
		margin-left: 15upx;
	}
	.btn:before,
	.btn:after{
		display: none;
	}
	.btn1 {
		border: 1px solid #dfdfdf !important;
		color: #7f7f7f !important;
	}

	.btn2 {
		border: 1px solid #ffadb1 !important;
		color: #ff6f75 !important;
	}

	.bottom-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		white-space: nowrap;
	}

	.overall-title {
		margin: 0 10upx;
	}

	.bottom {
		position: fixed;
		left: 0;
		bottom: 50px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 40upx;
		background-color: #fff;
		border: 1px solid #f1f1f1;
	}

	.bottom-right button {
		margin-left: 15upx;
	}

	.bottom-right button,
	.bottom-right text {
		display: inline-block;
		vertical-align: middle;
	}

	.bottom-right {
		flex: 1;
		text-align: right;
	}

	.arrow {
		color: #ccc;
	}

	.r-cb {
		display: flex;
	}
</style>
