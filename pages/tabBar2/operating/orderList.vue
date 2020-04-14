<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>全部</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>待付款</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>待发货</text></view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>待收货</text></view>
			<view class="nav nav-left" :class="{active:active==5}" @click="toggle(5)"><text>已完成</text></view>
		</view>
		
		<view class="padding search">
			<view class="select">
				<icon type="search" size="20"/>
				<text class="order" @click="open">asdasd123123123123asdad</text>
				<icon type="search" class="fr" size="20"/>
			</view>
			<view>
				<input type="text" value="" placeholder="输入关键字"/>
			</view>
		</view>
		
		<view class="item" v-for="(item,index) in 3" :key='index'>
			<view class=" padding" >
				<view class="top-line bottom-border">
					<view class="s1 cg">
						<view>
							<text>asdasdasdasdasdd</text>
							<text class="payway">微信支付</text>
						</view>
						<view>
							2020/03/30 12:30:40
						</view>
					</view>
					<view class="fr icon-fire iconfont" type="" ></view>
				</view>
				
				<view class="md-line bottom-border">
					<view>
						<image src="../../../static/img/pic/logo.png" mode=""></image>
					</view>
					<view class="md-line-word">
						<view class="s1">
							<text class="limit-text">儿童木马瑶瑶马宝宝大叔大婶阿萨大师</text>
							<text class="fr cg s1">$79.80</text>
						</view>
						<view class="s2 cg">
							<text class="limit-text">规格<text class="s3 ">深蓝色:24(155/60A)</text></text>
							<text class="fr s1">*1</text>
						</view>
					</view>
				</view>
				<view class="bottom-border">
					<view class="status-line cg s2">
						<text>订单状态</text>
						<text class="fr cr">待发货</text>
					</view>
					<view class="status-line cg s2">
						<text>买家昵称</text>
						<text class="fr ">许愿</text>
					</view>
					<view class="status-line cg s2">
						<text>配送方式</text>
						<text class="fr cblue">快递</text>
					</view>
				</view>
				<view class="bottom-border s2 cg" style="text-align: right;padding-right: 30upx;">
					共<text class="cr">1</text>件商品 实付:<text class="cr">$79.80</text>
				</view>
				<view class="bottom-border btn-line">
					<button type="default" class="btn btn-primary">确认发货</button>
					<button type="default" class="btn btn-primary">取消发货</button>
					<button type="default" class="btn ">备注</button>
					<button type="default" class="btn " @click="toDetail">查看详情</button>
				</view>
			</view>
		</view>
		
		<pop ref='order' :dataList='orderList'></pop>
	</view>
</template>

<script>
	import pop from '@/components/promptOptions/pop.vue'
	export default{
		data(){
			return{
				active:1,
				orderList:[
					{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'}
				]
			}
		},
		components:{
			pop,
			
		},
		methods:{
			toggle(t){
				this.active=t
			},
			choosed(m){
									 uni.$off('popChoosed')
			},
			open(){
									 var that=this
									 uni.$on('popChoosed',function(e){
										 that.choosed(e)
									 })
									 this.$refs.order.show=true
			},
			toDetail(){
				
				uni.navigateTo({
					url:'./orderDetail'
				})
			}
		}
	}
</script>

<style>
	.nav-bar{
		text-align: center;
		padding-bottom: 20upx;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 20%;
		box-sizing: border-box;
	}
	.nav.active text{
		color: #000000;
		position: relative;
	}
	.nav.active text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	
	
	.order{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.search{
		background-color: #f7f7f8;
	}
	.select text{
		width: 70%;
	}
	.select icon,
	.select text{
		display: inline-block;
		vertical-align: middle;
	}
	.search>view{
		background-color: #fff;
			width: 48%;
			padding: 10upx 0;
			margin:0 1%;
			display: inline-block;
			vertical-align: middle;
	}
	.payway{
		margin-left: 38upx;
		border-radius: 24upx;
		background-color: #ff6d7e;
		padding: 0 10upx;
		color: white;
	}
	.bottom-border{
		padding: 20upx 0;
		border-bottom: 1px solid #f7f7f7;
	}
	/* .top-line{
		
	} */
	.top-line .fr{
		margin-top: 20upx;
	}
	.top-line>view,
	.md-line>view{
		display: inline-block;
		vertical-align: top;
	}
	.md-line-word{
		width: 560upx;
	}
	.limit-text{
		display: inline-block;
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.md-line image{
		height: 90upx;
		width: 90upx;
		margin-right: 20upx;
	}
	.status-line{
		margin: 10upx 0;
	}
	
	.btn-line{
		text-align: right;
	}
	.btn{
		display: inline-block;
		font-size: 28upx;
		padding: 10upx 20upx;
		border-radius: 10upx;
		border: 1px solid #eee;
		text-align: center;
		margin-left: 15upx;
		height: initial;
		line-height: initial;
		background-color: #fff !important;
	}
	.btn-primary{
		background-color: #2CAEFF;
		color: #fff;
		border: none;
	}
	.item{
		border-bottom: 20upx solid #f3f3f3;
	}
</style>
