<template>
	<view style="padding-bottom: 110upx;">
		<view class="margin padding ">
			<view class="s6">商家已经通过售后申请</view>
			<view class="s2 cg tip">
				<view>退款退货申请流程:</view>
				<view>1、发起退款退货申请</view>
				<view>2、退货需将退货商品邮寄至商家指定地址，并在系统内输入快递单号</view>
				<view>3、商家收货后确认无误</view>
				<view>4、退款到您的账户</view>
			</view>
		</view>
		
		<view class="padding bgwhite s2">
			<view>填写快递单号</view>
			<view class="line">
				<text>快递公司</text>
				<input type="text" value="" />
			</view>
			<view class="line">
				<text>快递单号</text>
				<input type="text" value="" />
			</view>
		</view>
		
		<view class="padding margin s2">
			<view class="line">
				<text>处理方式</text>
				<input type="text" value="" />
			</view>
			<view class="line no-border" >
				<text>退款原因</text>
				<input type="text" value="" />
			</view>
			<view class="line">
				<text>退款说明</text>
				<input type="text" value="" />
			</view>
			<view class="line no-border">
				<text>退款金额</text>
				<input type="text" value="" />
			</view>
			<view class="line">
				<text>申请时间</text>
				<input type="text" value="" />
			</view>
		</view>
		
		<view class="btn-box bgwhite" >
			<button type="default" class="btn btn1" @click="to('')">提交</button>
			<button type="default" class="btn">取消申请</button>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.margin{
		margin: 20upx 0;
		background-color: #fff;
	}
	.bgwhite{
		background-color: #fff;
	}
	.tip>view{
		line-height: 50upx;
	}
	.s6{
		margin-bottom: 30upx;
	}
	.line{
		padding: 25upx 0;
	}
	.line input{
		display: inline-block;
		vertical-align: bottom;
		margin-left: 20upx;
		text-align: right;
		float: right;
	}
	.padding .line:not(:last-child){
		border-bottom: 1px solid #dedede;
	}
	.no-border{
		border: none !important;
	}
	
	.btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx 30upx 20upx 0;
		text-align: right;
		box-sizing: border-box;
	}
	.btn{
		width: 220upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		border: 1px solid #e0e0e0 !important;
		font-size: 30upx;
		display: inline-block;
		margin-left: 40upx;
		border-radius: 70upx;
		background-color: #fff !important;
	}
	.btn1{
		color: #ff6d7e !important;
		border: 1px solid #ff6d7e !important;
	}
</style>
