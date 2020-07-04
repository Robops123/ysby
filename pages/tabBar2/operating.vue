<template>
	<view style="overflow-y: auto;" class="operate-component">
		<view class="top">
			<view class="set" @click="toSetting">
				<image src="../../static/img/pic/setting.png" mode="" class="fr setting-img"></image>
			</view>
			<image :src="data.logo" mode="" class="headface"></image>
			<text class="s4 merchname">{{data.merchname}}</text>
		</view>
		<view class="item-3 s1 item-3-t bgw">
			<view>
				<view class="show-num">{{data.todayOrder || 0}}</view>
				<view>今日订单</view>
			</view>
			<view>
				<view class="show-num">{{data.todayDeal || 0}}</view>
				<view>今日成交</view>
			</view>
			<view>
				<view class="show-num">{{data.newMembers || 0}}</view>
				<view>新增会员</view>
			</view>
		</view>
		
		<view class="card">
			<view class="s5">
				<image src="../../static/img/pic/other/icon1.png" mode="" style="width: 35upx;height: 40upx;margin-right: 15upx;vertical-align: middle;" class=""></image>
				<text>订单管理</text>
				<view class="s3 cg fr" @click="toOrderList(0)">全部
				<text class="icon-arrow-right iconfont "></text>
				</view>
			</view>
			<view class="dd item-3" style="margin-top: 30upx;">
				<view class="item-list" @click="toOrderList(2)">
					<view class="img-box"><image src="../../static/img/pic/shop/icon3.png" mode="" style="width: 90upx;"></image></view>
					<view>待发货</view>
					<view class="cg s3"><text class="cr">{{data.notSend || 0}}</text>单</view>
				</view>
				<view class="item-list" @click="toOrderList(1)">
					<view class="img-box"><image src="../../static/img/pic/shop/icon2.png" mode=""></image></view>
					<view>待付款</view>
					<view class="cg s3"><text class="cr">{{data.notPay || 0}}</text>笔</view>
				</view>
				<view class="item-list">
					<view class="img-box"><image src="../../static/img/pic/shop/icon6.png" mode=""></image></view>
					<view>维权订单</view>
					<view class="cg s3"><text class="cr">{{data.rightsOrder || 0}}</text>笔</view>
				</view>
			</view>
		</view>
		
		
		<view class="card" style="margin-top: 20upx;">
			<view class="s5">
				<image src="../../static/img/pic/other/icon2.png" style="width: 40upx;height: 40upx;margin-right: 15upx;vertical-align: middle;" mode="" class=""></image>
				<text>商城管理</text>
			</view>
			<view class="dd item-3" style="margin-top: 30upx;">
				<view class="item-list" @click="toGoods">
					<view class="img-box"><image src="../../static/img/pic/shop/icon5.png" mode="" style="width: 70upx;height: 70upx;"></image></view>
					<view>商品管理</view>
					<view class="cg s3"><text class="cr">{{data.goods || 0}}</text>个</view>
				</view>
				<view class="item-list" @click="toggletab(1)">
					<view class="img-box"><image src="../../static/img/pic/shop/icon4.png" mode="" style="width: 60upx;height: 50upx;"></image></view>
					<view>会员管理</view>
					<view class="cg s3"><text class="cr">{{data.members || 0}}</text>个</view>
				</view>
				<view class="item-list" @click="toggletab(3)">
					<view class="img-box"><image src="../../static/img/pic/shop/icon1.png" mode="" style="width: 70upx;height: 60upx;"></image></view>
					<view>财务管理</view>
				</view>
			</view>
		</view>
		
		<view class="s3 cg" style="text-align: center;margin: 30upx 0;">更多设置请到PC端后台</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				uid:'',
				token:'',
				data:''
			}
		},
		mounted(){
			this.init()
		},
		methods:{
			init(){
				var userInfo=uni.getStorageSync('userInfo')
				if(userInfo!='' & userInfo!=null & userInfo!=undefined){
					this.uid=userInfo.uid
					this.token=userInfo.token
					this.getWorkBench()
				}
			},
			toOrderList(type){
				uni.navigateTo({
					url:'./operating/orderList?active='+type
				})
			},
			toggletab(w){
				this.$emit('toggletab',w)
			},
			toSetting(){
				var that=this
				uni.$on('updateOperating',function(){
					that.getWorkBench()
				})
				uni.navigateTo({
					url:'./operating/setting'
				})
			},
			toGoods(){
				uni.navigateTo({
					url:'./operating/goods'
				})
			},
			getWorkBench(){
				this.$loading()
				var that=this
				var url='&r=api.myshop.workbench'
				var params={
					uid:this.uid,
					token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					that.data=res.data	
					that.$forceUpdate()
				  })
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.top{
		background: linear-gradient(to right,#fbd8d8,#febab4);
		padding: 40upx 10upx;
	}
	.headface{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		vertical-align: middle;
		margin: 20upx 30upx 10upx 30upx;
	}
	.headface+text{
		display: inline-block;
		vertical-align: middle;
	}
	.bgw{
		background-color: #fff;
	}
	.bgw>view{
		padding: 20upx 0;
	}
	.bgw .show-num{
		margin-bottom: 10upx;
	}
	.item-3>view{
		text-align: center;
		display: inline-block;
		vertical-align: top;
		width: 33%;
		margin: 25upx 0;
	}
	.item-3-t{
		margin: 20upx 0;
	}
	.item-3-t>view:not(:last-child){
		border-right: 1px solid #f3f3f3;
	}
	
	
	.card{
		padding: 30upx;
		background-color: #fff;
	}
	.card .fr{
			display: inline-block;
			vertical-align: middle;
			margin-top: 5upx;
		}
		.card .fr icon{
			margin-left: 20upx;
		}
		
		.item-list{
			text-align: center;
			margin-top: 60upx;
			display: inline-block;
			vertical-align: top;
		}
		
		.item-list view{
			white-space: nowrap;
			font-size: 24upx;
			color: #696969;
		}
		.dd .item-list:last-child{
			margin-right: 0;
		}
		 .item-list image{
			width: 70upx;
			height: 70upx;
			margin-bottom: 20upx;
		}
		.top .set{
			text-align: right;
			float: right;
			margin-right: 20upx;
		}
		.img-box{
			height: 70upx;
			margin-bottom: 20upx;
		}
		.merchname{
			display: inline-block;
			max-width: 450upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.operate-component{
			/* #ifndef MP */
			height: calc(100% - 40px);
			/* #endif */
		}
</style>
