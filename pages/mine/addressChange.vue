<template>
	<view class="padding">
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">收货人</text>
			<input value="" placeholder="请输入收货人姓名" />
		</view>
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">收货号码</text>
			<input value="" placeholder="请输入收货人手机号" />
		</view>
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">所在地区</text>
			<input value="" placeholder="省市区 乡镇等" />
		</view>
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">详细地址</text>
			<input value="" placeholder="街道 楼牌号等" />
		</view>
		
		
		<view class="setting bottom-border flex-between">
			<view>
				<view class="s8">设置默认地址</view>
				<view class="s2">提醒:每次下单会默认推荐使用改地址</view>
			</view>
			<switch color='#ff6d7e' checked @change="switch1Change" style="transform:scale(0.7)"/>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn">保存</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			switch1Change(e){
				
			}
		}
	}
</script>

<style>
	.bottom-border{
		padding: 15upx 0;
		margin: 15upx 0;
		border-bottom: 1px solid #f7f7f7;
		}
		.label-80{
			width: 150upx;
			margin-right: 20upx;
			display: inline-block;
			vertical-align: middle;
		}
		.bottom-border>view{
			display: inline-block;
			vertical-align: middle;
		}
		.bottom-border textarea,
		.bottom-border input{
			width: 500upx;
			display: inline-block;
		}
		.setting{
			margin-top: 50%;
		}
		.setting .s2{
			margin-top: 20upx;
		}
		.btn{
			margin-top: 50upx;
			width: 80%;
			height: 75upx;
			background: #ff6d7e !important;
			border-radius: 0;
			text-align: center;
			line-height: 75upx;
			border-radius: 75upx;
			letter-spacing: 4px;
			color: white;
			font-size: 34upx;
		}
</style>
