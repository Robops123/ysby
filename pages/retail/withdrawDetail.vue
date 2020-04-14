<template>
	<view style="background: white;">
		<view class="tip">预计佣金:+50元</view>
		<view  class="nav-bar">
			<view :class="{active:type==1}" @click="toggleNav(1)">所有</view>
			<view :class="{active:type==2}" @click="toggleNav(2)">待审核</view>
			<view :class="{active:type==3}" @click="toggleNav(3)">已打款</view>
			<view :class="{active:type==4}" @click="toggleNav(4)">无效</view>
		</view>
		<scroll-view scroll-y>
			<view class="list-item s2" v-for='(item,index) in 5' :key='index'>
				<view>
					<text>提现到银行卡</text>
					<text class="fr">+10.00</text>
				</view>
				<view>
					<text class="sm-gray">2019-10-25 09:44</text>
					<text class="fr">已打款</text>
				</view>
			</view>
			
			<!-- <view class="conclude">
				<view>
					<view>申请佣金</view>
					<view class="sm-gray">35.00</view>
				</view>
				<view>
					<view>实际金额</view>
					<view class="sm-gray">35.00</view>
				</view>
				<view>
					<view>提现手续费</view>
					<view class="sm-gray">35.00元</view>
				</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1
			}
		},
		methods: {
			toggleNav(t){
				this.type=t
			}
		}
	}
</script>

<style>
	.tip{
		line-height: 90upx;
		padding-left: 20upx;
		color: white;
		background: linear-gradient(to right,#ff9da1,#ff7076);
	}
.nav-bar{
	display: flex;
	justify-content: space-around;
	line-height: 90upx;
}
.active{
	border-bottom: 2px solid #ff6d7e;
		color: #ff6d7e;
}
.sm-gray{
	color: #8f8f8f;
	font-size: 30upx;
}
.list-item{
	padding: 30upx 20upx;
	border-bottom: 2px solid #e4e4e4;
}
.conclude{
	display: flex;
	justify-content: space-around;
	padding: 25upx 0;
	}
	.conclude view{
		text-align: center;
		
		line-height: 50upx;
	}
	.fr{
		float: right;
	}
</style>
