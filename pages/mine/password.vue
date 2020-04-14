<template>
	<view>
		<view class="option-box">
			<view class="option-item" >
				<text>原密码</text>
				<input type="text" value="" placeholder="填写原密码"/>
			</view>
			<view class="option-item" >
				<text>新密码</text>
				<input type="text" value="" placeholder="填写新密码"/>
			</view>
			<view class="option-item" >
				<text>确认</text>
				<input type="text" value="" placeholder="再次填写确认"/>
			</view>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn">完成</button>
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
			
		}
	}
</script>

<style>
	.option-box{
		background: white;
		padding-left: 30upx;
	}
	.option-item{
		/* line-height: 90upx; */
		padding: 15upx 0;
	}
	.option-item>text{
		display: inline-block;
		vertical-align: middle;
		padding-bottom: 15upx;
		width: 150upx;
	}
	.option-item>input{
		display: inline-block;
		vertical-align: middle;
		width: 500upx;
		padding-bottom: 15upx;
		border-bottom: 1px solid #efefef;
	}
	.btn{
		width: 80%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
		margin-top: 200upx;
	}
	.f1{
		color: #b5b5b5;
		margin-right: 25upx;
	}
	.f2{
	}
	.fr{
		float: right;
	}
</style>
