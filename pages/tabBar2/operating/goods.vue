<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>出售中</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>已售罄</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>仓库中</text></view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>回收站</text></view>
		</view>
		
		<view class="padding search">
			<!-- <view class="select">
				<icon type="search" size="20"/>
				<text class="order" @click="open">asdasd123123123123asdad</text>
				<icon type="search" class="fr" size="20"/>
			</view> -->
			<view>
				<icon type="search" size="20" style="float: right;"/>
				<input type="text" value="" placeholder="输入关键字"/>
			</view>
		</view>
		
		<view class="item" v-for="(item,index) in 3" :key='index'>
			<view class=" padding" @click="toEdit">
				<view class="md-line bottom-border">
					<view>
						<image src="../../../static/img/pic/logo.png" mode=""></image>
					</view>
					<view class="md-line-word">
						<view class="s1">
							<text class="limit-text">儿童木马瑶瑶马宝宝大叔大婶阿萨大师</text>
						</view>
						<view class=" cr s1">$79.80</view>
						<view class="s2 cg bottom">
							<text class="">库存:1000</text>
							<text class="">销量:80</text>
							<image src="../../../static/img/pic/logo.png" mode=""></image>
						</view>
					</view>
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
			toEdit(){
				uni.navigateTo({
					url:'./editGoods'
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
		width: 25%;
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
			width: 98%;
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
	.bottom{
		display: flex;
		justify-content: space-between;
	}
	.bottom image{
		width: 30upx;
		height: 20upx;
		margin-top: 8upx;
	}
</style>
